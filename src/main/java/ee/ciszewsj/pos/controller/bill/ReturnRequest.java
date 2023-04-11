package ee.ciszewsj.pos.controller.bill;

import lombok.Data;

import java.util.List;

@Data
public class ReturnRequest {
	private List<ReturnProductRequest> returnProductRequests;
}
