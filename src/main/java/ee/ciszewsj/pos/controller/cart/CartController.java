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
import java.util.concurrent.atomic.AtomicReference;

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
		return cartRepository.findByPosId(id).orElseThrow();
	}

	@GetMapping("/{id}/price")
	public Long getPrice(@PathVariable Long id) {
		Cart cart = cartRepository
				.findByPosId(id)
				.orElseThrow();
		AtomicReference<Long> result = new AtomicReference<>(0L);
		cart.getCartItemList().forEach(cartItem -> result.updateAndGet(v -> v + cartItem.getValue() * cartItem.getProduct().getPriceList().get(cartItem.getProduct().getPriceList().size() - 1).getValue()));
		return result.get();
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
			cartItem.setValue(0);
			cart.getCartItemList().add(cartItem);
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

		if (cart.getCartItemList().size() == 0) {
			throw new IllegalStateException();
		}

		List<CartItem> cartItemList = cart.getCartItemList();

		cartItemList.forEach(cartItem -> {
			Deposit deposit = new Deposit();
			deposit.setType(Deposit.Type.BOUGHT);
			deposit.setDescription("");
			deposit.setDate(new Date());
			deposit.setValue(cartItem.getValue() * -1);
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
