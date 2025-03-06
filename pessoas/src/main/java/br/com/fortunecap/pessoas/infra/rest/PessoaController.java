package br.com.fortunecap.pessoas.infra.rest;

import br.com.fortunecap.pessoas.domain.DomainService;
import br.com.fortunecap.pessoas.domain.model.Pessoa;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa")
@AllArgsConstructor
public class PessoaController {

    private final DomainService domainService;

    @PostMapping
    public ResponseEntity<Pessoa> criarPessoa(@RequestBody Pessoa pessoa) {
        return ResponseEntity.ok(domainService.salvarPessoa(pessoa));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscarPorId(@PathVariable String id) {
        return domainService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> listarTodos() {
        return ResponseEntity.ok(domainService.listarTodos());
    }

    @PutMapping
    public ResponseEntity<Pessoa> atualizarPessoa(@RequestBody Pessoa pessoa) {
        return ResponseEntity.ok(domainService.atualizar(pessoa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable String id) {
        domainService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
