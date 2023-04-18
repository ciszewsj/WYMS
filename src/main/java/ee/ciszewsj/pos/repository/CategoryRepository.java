package ee.ciszewsj.pos.repository;

import ee.ciszewsj.pos.database.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Optional<Category> findFirstByName(String name);
}
