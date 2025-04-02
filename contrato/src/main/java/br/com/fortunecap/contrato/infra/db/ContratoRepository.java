package br.com.fortunecap.contrato.infra.db;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.fortunecap.contrato.domain.model.ContratoModel;

public interface ContratoRepository extends MongoRepository<ContratoModel, String>{

}
