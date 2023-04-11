package ee.ciszewsj.pos.repository;

import ee.ciszewsj.pos.database.Pos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PosRepository extends JpaRepository<Pos, Long> {
}
