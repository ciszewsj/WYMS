package ee.ciszewsj.pos.repository;

import ee.ciszewsj.pos.database.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
