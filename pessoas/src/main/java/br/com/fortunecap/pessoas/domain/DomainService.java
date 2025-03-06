package br.com.fortunecap.pessoas.domain;

import br.com.fortunecap.pessoas.domain.model.Pessoa;
import br.com.fortunecap.pessoas.infra.db.repository.PessoaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Component
public class DomainService {

    private final PessoaRepository pessoaRepository;

    public Pessoa salvarPessoa(Pessoa pessoa){
       return pessoaRepository.save(pessoa);
    }

    public Optional<Pessoa> buscarPorId(String id){
        return pessoaRepository.findById(id);
    }

    public List<Pessoa> listarTodos(){
        return pessoaRepository.findAll();
    }

    public Pessoa atualizar(Pessoa pessoa){
       return pessoaRepository.save(pessoa);
    }

    public void deletar(String id){
        pessoaRepository.deleteById(id);
    }
}
