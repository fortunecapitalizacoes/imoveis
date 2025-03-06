package br.com.fortune.fortuneimoveis.gestaoimoveis.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.fortune.fortuneimoveis.gestaoimoveis.domain.ImovelDomain;
import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db.FileStorageService;
import br.com.fortune.fortuneimoveis.gestaoimoveis.domain.models.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imoveis")
public class ImovelController {


	private final ImovelDomain imovelDomain;

	public ImovelController(FileStorageService fileStorageService, ImovelDomain imovelDomain) {
		this.imovelDomain = imovelDomain ;
	}

	@GetMapping("imagem/{id}")
	public ResponseEntity<?> getImage(@PathVariable("id") String id) {
		return imovelDomain.getImage(id);
	}
	
	@DeleteMapping("imagem/delete/{id}")
	public ResponseEntity<?> deleteImage(@PathVariable("id") String id) {
		imovelDomain.deleteFile(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(HttpStatus.ACCEPTED);
	}

	@PostMapping("imagem/upload")
	public ResponseEntity<?> uploadFile(@RequestParam("file") List<MultipartFile> files) {
		try {
			List<String> fileIds = imovelDomain.uploadFiles(files);
			return ResponseEntity.ok(fileIds);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o arquivo.");
		}
	}

	@PostMapping
	public ResponseEntity<Imovel> salvarImovel(@RequestBody Imovel imovel) {
		Imovel novoImovel = imovelDomain.salvarImovel(imovel);
		return ResponseEntity.ok(novoImovel);
	}

	@GetMapping
	public ResponseEntity<?> listarImoveis() {
		return ResponseEntity.ok(imovelDomain.listarImoveis());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Imovel> buscarPorId(@PathVariable("id") String id) {
		Optional<Imovel> imovel = imovelDomain.buscarPorId(id);
		return imovel.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("deletar/{id}")
	public ResponseEntity<Void> deletarImovel(@PathVariable("id") String id) {
		imovelDomain.deletarImovel(id);
	    return ResponseEntity.noContent().build();
	}
}
