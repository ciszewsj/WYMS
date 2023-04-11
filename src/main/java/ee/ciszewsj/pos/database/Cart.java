package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Cart {
	@Id
	private Long id;
	@OneToMany
	private List<CartItem> cartItemList;
	@OneToOne
	private Pos pos;
}
