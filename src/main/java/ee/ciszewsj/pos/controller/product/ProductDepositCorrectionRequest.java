package ee.ciszewsj.pos.controller.product;

import jakarta.validation.constraints.Max;
import lombok.Data;

@Data
public class ProductDepositCorrectionRequest {
	@Max(value = 256)
	private String description;
	private Integer value;
}
