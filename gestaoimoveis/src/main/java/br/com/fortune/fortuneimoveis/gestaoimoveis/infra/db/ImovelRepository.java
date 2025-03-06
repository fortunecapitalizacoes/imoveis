package br.com.fortune.fortuneimoveis.gestaoimoveis.infra.db;

import br.com.fortune.fortuneimoveis.gestaoimoveis.domain.models.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends MongoRepository<Imovel, String> {
}
