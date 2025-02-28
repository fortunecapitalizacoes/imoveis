package br.com.fortune.fortuneimoveis.gestaoimoveis.domain;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.ImageService;
import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db.FileStorageService;
import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db.ImovelRepository;
import br.com.fortune.fortuneimoveis.gestaoimoveis.models.Imovel;

@Service
public class ImovelDomain {

	private final ImovelRepository imovelRepository;
	private final FileStorageService fileStorageService;
	private final ImageService imageService;

	public ImovelDomain(ImovelRepository imovelRepository, FileStorageService fileStorageService,
			ImageService imageService) {
		this.imovelRepository = imovelRepository;
		this.fileStorageService = fileStorageService;
		this.imageService = imageService;
	}

	public List<String> uploadFiles(List<MultipartFile> files) throws IOException{
		return fileStorageService.uploadFiles(files);
	}
	
	public ResponseEntity<InputStreamResource> getImage(String id) {
		return imageService.getImage(id);
	}

	public Imovel salvarImovel(Imovel imovel) {
		return imovelRepository.save(imovel);
	}

	public List<Imovel> listarImoveis() {
		return imovelRepository.findAll();
	}

	public Optional<Imovel> buscarPorId(String id) {
		return imovelRepository.findById(id);
	}

	public void deletarImovel(String id) {
		imovelRepository.deleteById(id);
	}
	
	public void deleteFile(String fileId) {
		fileStorageService.deleteFile(fileId);
    }
}
