package ee.ciszewsj.pos.controller.bill;

import lombok.Data;

@Data
public class ReturnProductRequest {
	private Long productId;
	private Integer amount;
}
