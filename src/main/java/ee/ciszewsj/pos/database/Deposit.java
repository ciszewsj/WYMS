package ee.ciszewsj.pos.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Deposit {
	@Id
	private Long id;
	private Type type;
	private String description;
	private Date date;
	private Integer value;

	public enum Type {
		CORRECTION,
		BOUGHT,
		DELIVER
	}
}
