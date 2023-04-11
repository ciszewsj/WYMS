package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String code;
	private String image;
	@ManyToOne
	private Category category;
	@OneToMany
	private List<Price> priceList;
	@OneToMany
	private List<Deposit> depositList;
}
