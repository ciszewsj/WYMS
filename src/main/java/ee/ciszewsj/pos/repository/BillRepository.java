package ee.ciszewsj.pos.repository;

import ee.ciszewsj.pos.database.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}
