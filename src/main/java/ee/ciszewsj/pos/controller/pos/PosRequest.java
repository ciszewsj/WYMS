package ee.ciszewsj.pos.controller.pos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PosRequest {
	@NotNull
	@Size(min = 3, max = 256)

	private String name;
}
