package ee.ciszewsj.pos.controller.xml;

import ee.ciszewsj.pos.database.*;
import ee.ciszewsj.pos.repository.BillRepository;
import ee.ciszewsj.pos.repository.CategoryRepository;
import ee.ciszewsj.pos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import static ee.ciszewsj.pos.controller.xml.BillRepresentation.billToBillRepresentation;
import static ee.ciszewsj.pos.controller.xml.ProductListRepresentation.productToRepresentation;

@Slf4j
@RestController
@RequestMapping("/xml")
@RequiredArgsConstructor
@CrossOrigin
public class XmlController {
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final BillRepository billRepository;

	@GetMapping(path = "/bill/{id}")
	public BillRepresentation getBillInXml(@PathVariable Long id) {
		Bill bill = billRepository.findById(id).orElseThrow();
		return billToBillRepresentation(bill);
	}

	@PostMapping("/bill")
	public void validateBill(@RequestBody BillRepresentation representation) {
		List<Product> products = productRepository.findAll();
		AtomicLong price = new AtomicLong(0L);
		final Date date = representation.getDate();
		representation.getProducts()
				.forEach(productRep -> {
					Product productFound = products.stream()
							.filter(product -> product.getCode().equals(productRep.getCode())).findFirst().orElseThrow();
					Long p = productFound.getPriceList().stream()
							.filter(itemProd -> date.compareTo(itemProd.getStart()) >= 0 && (itemProd.getEnd() == null || date.compareTo(itemProd.getEnd()) <= 0))
							.findFirst().orElse(new Price()).getValue();
					if (!Objects.equals(p, productRep.getPrice())) {
						throw new IllegalStateException();
					}
					price.addAndGet(productRep.getAmount() * productRep.getPrice());
				});
		if (price.get() != representation.getPrice()) {
			throw new IllegalStateException();
		}
	}

	@GetMapping(path = "/products")
	public ProductListRepresentation getProductsXml() {
		return productToRepresentation(productRepository.findAll());
	}


	@PostMapping("/products")
	public void validateProducts(@RequestBody ProductListRepresentation representation) {
		representation.getProducts().forEach(
				product -> {
					Category category = null;
					if (product.getName() != null) {
						category = categoryRepository.findFirstByName(product.getName()).orElse(null);
						if (category == null) {
							category = new Category();
							category.setImage(product.getCategoryImage());
							category.setName(product.getName());
							category = categoryRepository.save(category);
						}
					}
					Product productRep = productRepository.findProductByCode(product.getCode()).orElse(null);
					if (productRep == null) {
						productRep = new Product();
						productRep.setImage(product.getImage());
						productRep.setName(product.getName());
						productRep.setCode(product.getCode());
					}
					productRep.setCategory(category);
					if (productRep.getPriceList().size() > 0) {
						productRep.getPriceList().get(productRep.getPriceList().size() - 1).setEnd(new Date());
					}
					Price price = new Price();
					price.setValue(product.getPrice());
					price.setStart(new Date());
					productRep.getPriceList().add(price);

					Deposit deposit = new Deposit();
					deposit.setDate(new Date());
					deposit.setType(Deposit.Type.DELIVER);
					deposit.setValue(product.getAmount());
					productRep.getDepositList().add(deposit);

					productRepository.save(productRep);
				}
		);
	}


}
