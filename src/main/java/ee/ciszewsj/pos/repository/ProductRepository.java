package ee.ciszewsj.pos.repository;


import ee.ciszewsj.pos.database.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findProductByCode(String code);

	List<Product> findProductsByCategoryId(Long categoryId);
}
