package br.com.fortune.fortuneimoveis.gestaoimoveis.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db.ImovelRepository;
import br.com.fortune.fortuneimoveis.gestaoimoveis.models.Imovel;

@Service
public class ImovelDomain {

	private final ImovelRepository imovelRepository;

	public ImovelDomain(ImovelRepository imovelRepository) {
		this.imovelRepository = imovelRepository;
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
}
