package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
public class Product {
	@Id
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
