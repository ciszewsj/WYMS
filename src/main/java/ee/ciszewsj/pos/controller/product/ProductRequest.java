package ee.ciszewsj.pos.controller.product;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequest {
	@Size(min = 3, max = 256)
	private String name;
	private String image;
	private Long price;
	private Long categoryId;
	private Integer amount;
}
