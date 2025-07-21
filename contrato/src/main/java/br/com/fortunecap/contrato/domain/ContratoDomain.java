package br.com.fortunecap.contrato.domain;

import br.com.fortunecap.contrato.application.dtos.ContratoDTO;
import br.com.fortunecap.contrato.application.dtos.Imovel;
import br.com.fortunecap.contrato.application.dtos.ParametrosPreencherContratoDTO;
import br.com.fortunecap.contrato.application.dtos.PessoalDTO;
import br.com.fortunecap.contrato.domain.model.ContratoModel;
import br.com.fortunecap.contrato.infra.db.ContratoRepository;
import br.com.fortunecap.contrato.infra.db.FileStorageService;
import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ContratoDomain {
    private static final Logger logger = Logger.getLogger(ContratoDomain.class.getName());

    private final FileStorageService fileStorageService;
    private final ContratoRepository contratoRepository;

    public String processrContrato(MultipartFile file) {
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
            
            logger.info("Contrato salvo com sucesso no banco de dados e arquivo armazenado." + conteudoContrato);
            
            
            logger.info("Contrato cadastrado com ID: " + caminhoArquivo);
        } catch (Exception e) {
            logger.severe("Erro ao processar o arquivo Word: " + e.getMessage());
        }
        return contratoId;
    }
    
    private void pocessar(ContratoModel contrto, PessoalDTO pessoa, Imovel imovel ) {
    	
    }

    public ContratoModel incluirModeloContrato(MultipartFile file, String fileName, String filetipo) throws IOException {
    	var idContrato = fileStorageService.uploadFiles(file);
    	return contratoRepository.save(ContratoModel.builder().contratoId(idContrato).nome(fileName).tipo(filetipo).id(UUID.randomUUID().toString()).build());
    }

    public Optional<InputStream> getContrato(String id){
       return fileStorageService.getFile(id);
    }
}
