package br.com.fortunecap.contrato.infra.rest;

import br.com.fortunecap.contrato.domain.ContratoDomain;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/contrato")
@AllArgsConstructor
public class ContratoRest {

    private final ContratoDomain contratoService;

    @PostMapping("/processarContrato")
    public ResponseEntity<String> processarContrato(@RequestParam("file") MultipartFile file) throws IOException {		
		return ResponseEntity.ok(contratoService.processrContrato(file));
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("fileName") String fileName,
                                        @RequestParam("filetipo") String filetipo) {
        try {
            var contratoDto = contratoService.incluirModeloContrato(file, fileName, filetipo);
            return ResponseEntity.ok(contratoDto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o arquivo.");
        }
    }

}
