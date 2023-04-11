package ee.ciszewsj.pos.controller.category;

import ee.ciszewsj.pos.database.Category;
import ee.ciszewsj.pos.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
	private final CategoryRepository categoryRepository;

	@GetMapping
	public List<Category> getCategories() {
		return categoryRepository.findAll();
	}

	@GetMapping("/{id}")
	public Category getCategory(@PathVariable Long id) {
		return categoryRepository.findById(id).orElseThrow();
	}

	@PostMapping
	public Category createCategory(@RequestBody @Validated CategoryRequest request) {
		Category category = new Category();
		category.setName(request.getName());
		category.setImage(request.getPictureUrl());
		return categoryRepository.save(category);
	}

	@PutMapping("/{id}")
	public Category updateCategory(@PathVariable Long id, @RequestBody @Validated CategoryRequest request) {
		Category category = categoryRepository.findById(id).orElseThrow();
		category.setName(request.getName());
		category.setImage(request.getPictureUrl());
		return categoryRepository.save(category);
	}

	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable Long id) {
		Category category = categoryRepository.findById(id).orElseThrow();
		categoryRepository.delete(category);
	}
}
