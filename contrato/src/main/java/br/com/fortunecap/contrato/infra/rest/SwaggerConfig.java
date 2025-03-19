package br.com.fortunecap.contrato.infra.rest;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
						.title("Gestão de Imóveis API")
						.version("v1")
						.description("API para gerenciamento de imóveis"))
				.path("/contrato/upload", createUploadPathItem())
				.path("/contrato/cadastrar-modelo-contrato", createUploadPathItem());
	}

	private Operation createUploadOperation() {
		return new Operation()
				.summary("Upload de arquivo")
				.description("Faz o upload de um arquivo para um imóvel")
				.requestBody(new RequestBody()
						.content(new Content()
								.addMediaType("multipart/form-data",
										new MediaType()
												.schema(new Schema<>()
														.type("object")
														.addProperties("file",
																new Schema<>()
																		.type("string")
																		.format("binary"))
														.addRequiredItem("file")))))

				.responses(new ApiResponses()
						.addApiResponse("200", new ApiResponse().description("Upload bem-sucedido"))
						.addApiResponse("400", new ApiResponse().description("Erro no upload ou arquivo inválido")));
	}

	private PathItem createUploadPathItem() {
		return new PathItem().post(createUploadOperation());
	}
}
