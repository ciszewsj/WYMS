package ee.ciszewsj.pos.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "deposits")
public class Deposit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
