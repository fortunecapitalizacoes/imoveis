package br.com.fortune.fortuneimoveis.gestaoimoveis.infra;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*") // Permite qualquer origem
						.allowedMethods("*") // Permite todos os métodos HTTP
						.allowedHeaders("*"); // Permite todos os headers
			}
		};
	}
}
