package ee.ciszewsj.pos.controller.bill;

import ee.ciszewsj.pos.database.Bill;
import ee.ciszewsj.pos.database.CartItem;
import ee.ciszewsj.pos.database.Product;
import ee.ciszewsj.pos.repository.BillRepository;
import ee.ciszewsj.pos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/bill")
@RequiredArgsConstructor
@CrossOrigin
public class BillController {
	private final BillRepository billRepository;
	private final ProductRepository productRepository;

	@GetMapping
	public List<Bill> getBills() {
		return billRepository.findAll();
	}

	@GetMapping("/{id}")
	public Bill getBill(@PathVariable Long id) {
		return billRepository.findById(id).orElseThrow();
	}

	@PostMapping("/{id}")
	@Transactional
	public void makeReturn(@PathVariable Long id, @RequestBody @Validated ReturnRequest request) {
		Bill bill = billRepository.findById(id).orElseThrow();
		List<CartItem> newReturns = new ArrayList<>();
		request.getReturnProductRequests()
				.forEach(
						returnProductRequest -> {
							Integer products =
									bill
											.getCartItemList()
											.stream()
											.filter(cartItem -> cartItem.getProduct().getId().equals(returnProductRequest.getProductId()))
											.map(CartItem::getValue)
											.reduce(0, Integer::sum);
							products =
									bill
											.getReturnsItemList()
											.stream()
											.filter(cartItem -> cartItem.getProduct().getId().equals(returnProductRequest.getProductId()))
											.map(CartItem::getValue)
											.map(value -> -1 * value)
											.reduce(products, Integer::sum);

							if (products - returnProductRequest.getAmount() >= 0) {
								CartItem newReturn = new CartItem();
								Product product = productRepository.findById(returnProductRequest.getProductId()).orElseThrow();
								newReturn.setProduct(product);
								newReturn.setType(CartItem.Type.RETURN);
								newReturn.setValue(returnProductRequest.getAmount());
								newReturns.add(newReturn);
							} else {
								throw new IllegalStateException();
							}

						}
				);
		bill.getReturnsItemList().addAll(newReturns);
		billRepository.save(bill);
	}

}
