package ee.ciszewsj.pos.controller.product;

import lombok.Data;

@Data
public class ProductRequest {
	private String name;
	private String image;
	private Long price;
	private Long categoryId;
	private Integer amount;
}
