package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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
	@Column(unique = true)
	private String code;
	private String image;
	@ManyToOne(cascade = CascadeType.ALL)
	private Category category;
	@OneToMany(cascade = CascadeType.ALL)
	private List<Price> priceList = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL)
	private List<Deposit> depositList = new ArrayList<>();
}
