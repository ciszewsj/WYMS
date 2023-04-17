package ee.ciszewsj.pos.controller.product;

import ee.ciszewsj.pos.database.Category;
import ee.ciszewsj.pos.database.Deposit;
import ee.ciszewsj.pos.database.Price;
import ee.ciszewsj.pos.database.Product;
import ee.ciszewsj.pos.repository.CategoryRepository;
import ee.ciszewsj.pos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;

	@GetMapping
	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	@GetMapping("/{id}")
	public Product getProduct(@PathVariable String id) {
		return productRepository.findProductByCode(id).orElseThrow();
	}

	@PostMapping
	@Transactional
	public Product createProduct(@RequestBody ProductRequest request) {
		Product product = new Product();
		Category category = null;
		if (request.getCategoryId() != null) {
			category = categoryRepository.findById(request.getCategoryId()).orElse(null);
		}
		product.setCategory(category);
		product.setName(request.getName());
		product.setImage(request.getImage());
		product.setCode(UUID.randomUUID().toString());

		Price price = new Price();
		price.setValue(request.getPrice());
		price.setStart(new Date());
		product.getPriceList().add(price);

		if (request.getAmount() != null && request.getAmount() != 0) {
			Deposit deposit = new Deposit();
			deposit.setValue(request.getAmount());
			deposit.setDate(new Date());
			deposit.setDescription("");
			deposit.setType(Deposit.Type.CORRECTION);
			product.getDepositList().add(deposit);
		}
		return productRepository.save(product);
	}

	@PutMapping("/{id}")
	@Transactional
	public Product updateProduct(@PathVariable String id, @RequestBody ProductRequest request) {
		Product product = productRepository.findProductByCode(id).orElseThrow();
		Category category = null;
		if (request.getCategoryId() != null) {
			category = categoryRepository.findById(request.getCategoryId()).orElse(null);
		}
		product.setCategory(category);
		product.setName(request.getName());
		product.setImage(request.getImage());

		if (request.getPrice() != null) {
			Price oldPrice = product.getPriceList().stream().filter(price -> price.getEnd() == null).findFirst().orElse(null);
			if (oldPrice == null || !Objects.equals(request.getPrice(), oldPrice.getValue())) {
				if (oldPrice != null) {
					oldPrice.setEnd(new Date());
				}
				Price newPrice = new Price();
				newPrice.setStart(new Date());
				newPrice.setValue(request.getPrice());
				product.getPriceList().add(newPrice);
			}
		}
		return productRepository.save(product);
	}

	@GetMapping("/category/{id}")
	public List<Product> getProductsByCategory(@PathVariable Long id) {
		return productRepository.findProductsByCategoryId(id);
	}

	@PostMapping("/deposit/{id}")
	public void depositCorrection(@PathVariable String id, @RequestBody ProductDepositCorrectionRequest request) {
		Product product = productRepository.findProductByCode(id).orElseThrow();

		if (request.getValue() == 0) {
			throw new IllegalStateException();
		}

		Deposit deposit = new Deposit();
		deposit.setDescription(request.getDescription());
		deposit.setType(Deposit.Type.CORRECTION);
		deposit.setValue(request.getValue());
		deposit.setDate(new Date());

		product.getDepositList().add(deposit);
		productRepository.save(product);
	}
}
