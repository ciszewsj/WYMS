package ee.ciszewsj.pos.controller.product;

import ee.ciszewsj.pos.database.Category;
import ee.ciszewsj.pos.database.Deposit;
import ee.ciszewsj.pos.database.Product;
import ee.ciszewsj.pos.repository.CategoryRepository;
import ee.ciszewsj.pos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;

	@GetMapping
	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	@GetMapping("/{id}")
	public Product getProduct(@PathVariable Long id) {
		return productRepository.findById(id).orElseThrow();
	}

	@PostMapping
	@Transactional
	public Product createProduct(@RequestBody ProductRequest request) {
		Product product = new Product();

		Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();

		product.setCategory(category);
		product.setName(request.getName());
		product.setImage(request.getImage());
		product.setCode(UUID.randomUUID().toString());

		if (request.getAmount() != 0) {
			Deposit deposit = new Deposit();
			deposit.setValue(request.getAmount());
			deposit.setDate(new Date());
			deposit.setDescription("");
			deposit.setType(Deposit.Type.DELIVER);
			product.getDepositList().add(deposit);
		}
		return productRepository.save(product);
	}

	@PutMapping("/{id}")
	@Transactional
	public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
		Product product = productRepository.findById(id).orElseThrow();

		Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow();

		product.setCategory(category);
		product.setName(request.getName());
		product.setImage(request.getImage());

		if (request.getAmount() != 0) {
			Deposit deposit = new Deposit();
			deposit.setValue(request.getAmount());
			deposit.setDate(new Date());
			deposit.setDescription("");
			deposit.setType(Deposit.Type.CORRECTION);
			product.getDepositList().add(deposit);
		}
		return productRepository.save(product);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		Product product = productRepository.findById(id).orElseThrow();
		productRepository.delete(product);
	}
}
