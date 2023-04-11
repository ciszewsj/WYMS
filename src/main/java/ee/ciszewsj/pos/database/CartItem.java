package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart-items")
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
