package ee.ciszewsj.pos.controller.bill;

import jakarta.validation.Valid;
import lombok.Data;

import java.util.List;

@Data
public class ReturnRequest {
	@Valid
	private List<ReturnProductRequest> returnProductRequests;
}
