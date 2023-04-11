package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Bill {
	@Id
	private Long id;
	private String cashierId;
	private Date date;
	@OneToMany
	private List<CartItem> cartItemList;
	@OneToMany
	private List<CartItem> returnsItemList;
}
