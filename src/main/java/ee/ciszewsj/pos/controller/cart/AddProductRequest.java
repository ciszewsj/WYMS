package ee.ciszewsj.pos.controller.cart;

import lombok.Data;

@Data
public class AddProductRequest {
	private Long productId;
	private Integer amount;
}
