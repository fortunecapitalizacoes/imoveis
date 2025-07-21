package br.com.fortunecap.contrato.infra.rest;

import br.com.fortunecap.contrato.domain.ContratoDomain;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadDocx(@PathVariable String fileId) {
        Optional<InputStream> inputStreamOptional = contratoService.getContrato(fileId);

        if (inputStreamOptional.isPresent()) {
            try (InputStream inputStream = inputStreamOptional.get()) {
                byte[] bytes = inputStream.readAllBytes();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
                headers.setContentDisposition(ContentDisposition.attachment().filename("arquivo.docx").build());

                return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
