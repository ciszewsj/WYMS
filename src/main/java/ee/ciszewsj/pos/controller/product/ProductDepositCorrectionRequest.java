package ee.ciszewsj.pos.controller.product;

import lombok.Data;

@Data
public class ProductDepositCorrectionRequest {
	private String description;
	private Integer value;
}
