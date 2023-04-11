package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "bill")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String cashierId;
	private Date date;
	@OneToMany
	private List<CartItem> cartItemList;
	@OneToMany
	private List<CartItem> returnsItemList;
}
