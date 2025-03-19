package br.com.fortunecap.contrato.domain;

import br.com.fortunecap.contrato.infra.db.FileStorageService;
import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ContratoDomain {
    private static final Logger logger = Logger.getLogger(ContratoDomain.class.getName());

    private final FileStorageService fileStorageService;

    public String cadastrarContrato(MultipartFile file) {
        String contratoId = null;
        try (InputStream inputStream = file.getInputStream(); XWPFDocument document = new XWPFDocument(inputStream)) {
            // Lê todos os parágrafos do documento e concatena os textos
            List<String> paragrafoTexts = document.getParagraphs()
                    .stream()
                    .map(XWPFParagraph::getText)
                    .collect(Collectors.toList());
            
            String conteudoContrato = String.join("\n", paragrafoTexts);
            logger.info("Conteúdo do contrato lido com sucesso.");
            
            // Salva o arquivo e obtém o caminho
            String caminhoArquivo = fileStorageService.uploadFiles(file);
            
            logger.info("Contrato salvo com sucesso no banco de dados e arquivo armazenado.");
            
            
            logger.info("Contrato cadastrado com ID: " + contratoId);
        } catch (Exception e) {
            logger.severe("Erro ao processar o arquivo Word: " + e.getMessage());
        }
        return contratoId;
    }

    public String incluirModeloContrato(MultipartFile file) throws IOException {
        return fileStorageService.uploadFiles(file);
    }
}
