package ee.ciszewsj.pos.controller.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequest {
	@Size(min = 3, max = 256)
	@NotNull
	private String name;
	@Size(max = 256)
	private String image;
	@Min(value = 0)
	private Long price;
	private Long categoryId;
	@Min(value = 0)
	private Integer amount;
	@NotNull
	@Size(min = 3, max = 256)
	private String code;
}
