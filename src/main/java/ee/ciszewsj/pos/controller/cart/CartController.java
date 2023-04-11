package ee.ciszewsj.pos.controller.cart;

import ee.ciszewsj.pos.database.*;
import ee.ciszewsj.pos.repository.BillRepository;
import ee.ciszewsj.pos.repository.CartRepository;
import ee.ciszewsj.pos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin
public class CartController {
	private final CartRepository cartRepository;
	private final ProductRepository productRepository;
	private final BillRepository billRepository;

	@GetMapping("/{id}")
	public Cart getCart(@PathVariable Long id) {
		return cartRepository.findById(id).orElseThrow();
	}

	@GetMapping("/{id}/price")
	public Long getPrice(@PathVariable Long id) {
		return (cartRepository
				.findById(id)
				.orElseThrow())
				.getCartItemList()
				.stream()
				.map(CartItem::getProduct)
				.map(Product::getPriceList)
				.map(prices -> prices
						.stream()
						.filter(price -> price.getEnd() == null)
						.map(Price::getValue)
						.findFirst()
						.orElse(0L))
				.mapToLong(price -> price)
				.reduce(0L, Long::sum);
	}

	@PostMapping("/{id}")
	@Transactional
	public void addProductToCart(@PathVariable Long id, @RequestBody AddProductRequest request) {
		Cart cart = cartRepository.findByPosId(id).orElseThrow();
		List<CartItem> cartItemList = cart.getCartItemList();

		Product product = productRepository.findById(request.getProductId()).orElseThrow();

		CartItem cartItem = cartItemList.stream().filter(cartItem1 -> cartItem1.getProduct().equals(product)).findFirst()
				.orElse(null);
		if (cartItem == null) {
			cartItem = new CartItem();
			cartItem.setProduct(product);
		}
		cartItem.setValue(cartItem.getValue() + request.getAmount());
		if (cartItem.getValue() <= 0) {
			cartItemList.remove(cartItem);
		}
		cartRepository.save(cart);
	}

	@PostMapping("/{id}/pay")
	@Transactional
	public Bill payForCart(@PathVariable Long id) {
		Cart cart = cartRepository.findByPosId(id).orElseThrow();
		List<CartItem> cartItemList = cart.getCartItemList();

		cartItemList.forEach(cartItem -> {
			Deposit deposit = new Deposit();
			deposit.setType(Deposit.Type.BOUGHT);
			deposit.setDescription("");
			deposit.setDate(new Date());
			deposit.setValue(cartItem.getValue());
			cartItem.getProduct().getDepositList().add(deposit);
		});

		Bill bill = new Bill();
		bill.setCartItemList(cartItemList);
		bill.setCashierId("CASHIER_ID");
		bill.setDate(new Date());

		cart.setCartItemList(new ArrayList<>());

		cartRepository.save(cart);
		return billRepository.save(bill);

	}
}
