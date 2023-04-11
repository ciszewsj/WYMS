package ee.ciszewsj.pos.controller.category;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryRequest {
	@Size(min = 3, max = 256)
	private String name;
	@Size(max = 256)
	private String pictureUrl;
}
