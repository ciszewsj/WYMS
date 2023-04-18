package ee.ciszewsj.pos.controller.xml;

import lombok.Data;

@Data
public class ProductRepresentation {
	private String code;
	private String name;
	private String image;
	private Long price;
	private Integer amount;
	private String category;
	private String categoryImage;
}
