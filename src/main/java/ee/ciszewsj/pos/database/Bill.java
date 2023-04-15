package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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
	@OneToMany(cascade = CascadeType.ALL)
	private List<CartItem> cartItemList = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL)
	private List<CartItem> returnsItemList = new ArrayList<>();
}
