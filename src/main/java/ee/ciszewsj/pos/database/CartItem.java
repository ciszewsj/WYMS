package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CartItem {
	@Id
	private Long id;
	private Integer value = 0;
	private Type type;
	@ManyToOne
	private Product product;

	public enum Type {
		BOUGHT,
		RETURN
	}
}
