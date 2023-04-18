package ee.ciszewsj.pos.controller.xml;

import ee.ciszewsj.pos.database.Deposit;
import ee.ciszewsj.pos.database.Product;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductListRepresentation {
	private List<ProductRepresentation> products = new ArrayList<>();

	public static ProductListRepresentation productToRepresentation(List<Product> products) {
		ProductListRepresentation representation = new ProductListRepresentation();
		products.forEach(product -> {
			ProductRepresentation productRepresentation = new ProductRepresentation();
			productRepresentation.setCode(product.getCode());
			productRepresentation.setName(product.getName());
			productRepresentation.setAmount(product.getDepositList().stream().map(Deposit::getValue).reduce(0, Integer::sum));
			productRepresentation.setCategory(product.getCategory() != null ? product.getCategory().getName() : null);
			productRepresentation.setCategoryImage(product.getCategory() != null ? product.getCategory().getImage() : null);
			productRepresentation.setPrice(product.getPriceList().get(product.getPriceList().size() - 1).getValue());
			representation.getProducts().add(productRepresentation);
		});
		return representation;
	}
}
