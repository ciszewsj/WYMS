package ee.ciszewsj.pos.controller.pos;

import ee.ciszewsj.pos.database.Pos;
import ee.ciszewsj.pos.repository.PosRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/pos")
@RequiredArgsConstructor
public class PosController {
	private final PosRepository posRepository;

	@GetMapping
	public List<Pos> getPosList() {
		return posRepository.findAll();
	}

	@GetMapping("/{id}")
	public Pos getPos(@PathVariable Long id) {
		return posRepository.findById(id).orElseThrow();
	}

	@PostMapping
	public Pos createPos(@RequestBody PosRequest request) {
		Pos pos = new Pos();
		pos.setName(request.getName());
		return posRepository.save(pos);
	}

	@PutMapping("/{id}")
	public Pos updatePos(@PathVariable Long id, @RequestBody PosRequest request) {
		Pos pos = posRepository.findById(id).orElseThrow();
		pos.setName(request.getName());
		return posRepository.save(pos);
	}

	@DeleteMapping("/{id}")
	public void deletePos(@PathVariable Long id) {
		Pos pos = posRepository.findById(id).orElseThrow();
		posRepository.delete(pos);
	}


}
