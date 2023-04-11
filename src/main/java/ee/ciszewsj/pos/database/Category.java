package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Category {
	@Id
	private Long id;
	private String name;
	private String image;
}
