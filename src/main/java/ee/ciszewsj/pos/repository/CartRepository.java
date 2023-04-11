package ee.ciszewsj.pos.repository;

import ee.ciszewsj.pos.database.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByPosId(Long posId);
}
