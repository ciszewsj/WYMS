package ee.ciszewsj.pos.controller.bill;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReturnProductRequest {
	private Long productId;
	@Min(value = 1)
	@NotNull
	private Integer amount;
}
