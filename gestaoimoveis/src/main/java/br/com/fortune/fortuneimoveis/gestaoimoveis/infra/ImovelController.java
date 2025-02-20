package br.com.fortune.fortuneimoveis.gestaoimoveis.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.fortune.fortuneimoveis.gestaoimoveis.domain.ImovelDomain;
import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db.FileStorageService;
import br.com.fortune.fortuneimoveis.gestaoimoveis.models.Imovel;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imoveis")
public class ImovelController {

	private final FileStorageService fileStorageService;
	private final ImageService imageService;
	private final ImovelDomain imovelService;

	public ImovelController(FileStorageService fileStorageService, ImageService imageService,
			ImovelDomain imovelService) {
		this.fileStorageService = fileStorageService;
		this.imageService = imageService;
		this.imovelService = imovelService;
	}

	@GetMapping("imagem/{id}")
	public ResponseEntity<?> getImage(@PathVariable("id") String id) {
		return imageService.getImage(id);
	}

	@PostMapping("imagem/upload")

	public ResponseEntity<?> uploadFile(@RequestParam("file") List<MultipartFile> files) {
		try {
			List<String> fileIds = fileStorageService.uploadFiles(files);
			return ResponseEntity.ok(fileIds);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o arquivo.");
		}
	}

	@PostMapping
	public ResponseEntity<Imovel> salvarImovel(@RequestBody Imovel imovel) {
		Imovel novoImovel = imovelService.salvarImovel(imovel);
		return ResponseEntity.ok(novoImovel);
	}

	@GetMapping
	public ResponseEntity<List<Imovel>> listarImoveis() {
		return ResponseEntity.ok(imovelService.listarImoveis());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Imovel> buscarPorId(@PathVariable("id") String id) {
		Optional<Imovel> imovel = imovelService.buscarPorId(id);
		return imovel.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("deletar/{id}")
	public ResponseEntity<Void> deletarImovel(@PathVariable("id") String id) {
	    imovelService.deletarImovel(id);
	    return ResponseEntity.noContent().build();
	}
}
