package ee.ciszewsj.pos.controller.pos;

import ee.ciszewsj.pos.database.Cart;
import ee.ciszewsj.pos.database.Pos;
import ee.ciszewsj.pos.repository.CartRepository;
import ee.ciszewsj.pos.repository.PosRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/pos")
@RequiredArgsConstructor
@CrossOrigin
public class PosController {
	private final PosRepository posRepository;
	private final CartRepository cartRepository;

	@GetMapping
	public List<Pos> getPosList() {
		return posRepository.findAll();
	}

	@GetMapping("/{id}")
	public Pos getPos(@PathVariable Long id) {
		return posRepository.findById(id).orElseThrow();
	}

	@PostMapping
	public Pos createPos(@RequestBody @Validated PosRequest request) {
		log.info("Create Pos Request: {}", request);
		Pos pos = new Pos();
		pos.setName(request.getName());

		Cart cart = new Cart();
		cart.setPos(pos);
		cartRepository.save(cart);

		return posRepository.save(pos);
	}

	@PutMapping("/{id}")
	public Pos updatePos(@PathVariable Long id, @RequestBody @Validated PosRequest request) {
		Pos pos = posRepository.findById(id).orElseThrow();
		pos.setName(request.getName());
		return posRepository.save(pos);
	}

	@DeleteMapping("/{id}")
	public void deletePos(@PathVariable Long id) {
		Pos pos = posRepository.findById(id).orElseThrow();
		Cart cart = cartRepository.findByPosId(id).orElse(null);
		if (cart != null) {
			cartRepository.delete(cart);
		}
		posRepository.delete(pos);
	}


}
