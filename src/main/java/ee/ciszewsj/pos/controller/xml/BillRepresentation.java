package ee.ciszewsj.pos.controller.xml;

import ee.ciszewsj.pos.database.Bill;
import ee.ciszewsj.pos.database.Price;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Data
public class BillRepresentation {
	private Date date;
	private List<ProductBillRepresentation> products = new ArrayList<>();
	private Long price;

	public static BillRepresentation billToBillRepresentation(Bill bill) {
		BillRepresentation billRepresentation = new BillRepresentation();
		billRepresentation.setDate(bill.getDate());

		AtomicReference<Long> total_price = new AtomicReference<>(0L);

		bill.getCartItemList().forEach(item -> {
			ProductBillRepresentation productBillRepresentation = new ProductBillRepresentation();
			productBillRepresentation.setCode(item.getProduct().getCode());
			productBillRepresentation.setAmount(item.getValue());
			final Date date = bill.getDate();
			productBillRepresentation.setPrice(item.getProduct().getPriceList().stream()
					.filter(itemProd -> date.compareTo(itemProd.getStart()) >= 0 && (itemProd.getEnd() == null || date.compareTo(itemProd.getEnd()) <= 0))
					.findFirst().orElse(new Price()).getValue());
			total_price.updateAndGet(v -> v + productBillRepresentation.getPrice() * productBillRepresentation.getAmount());
			billRepresentation.getProducts().add(productBillRepresentation);
		});
		billRepresentation.setPrice(total_price.get());

		return billRepresentation;
	}
}
