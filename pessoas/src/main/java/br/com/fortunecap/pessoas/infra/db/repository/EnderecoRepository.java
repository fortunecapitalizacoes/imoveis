package br.com.fortunecap.pessoas.infra.db.repository;

import br.com.fortunecap.pessoas.domain.model.Endereco;
import br.com.fortunecap.pessoas.domain.model.Pessoa;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnderecoRepository extends MongoRepository<Endereco, String> {
}
