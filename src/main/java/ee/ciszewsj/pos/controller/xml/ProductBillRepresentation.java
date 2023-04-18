package ee.ciszewsj.pos.controller.xml;

import lombok.Data;

@Data
public class ProductBillRepresentation {
	private Long price;
	private Integer amount;
	private String code;
}
