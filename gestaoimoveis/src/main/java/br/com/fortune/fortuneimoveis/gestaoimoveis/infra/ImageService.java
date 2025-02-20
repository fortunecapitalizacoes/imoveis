package br.com.fortune.fortuneimoveis.gestaoimoveis.infra;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.mongodb.client.gridfs.GridFSBuckets;

@Service
public class ImageService {

	private final GridFsTemplate gridFsTemplate;
	private final GridFSBucket gridFSBucket;

	public ImageService(GridFsTemplate gridFsTemplate, MongoDatabaseFactory mongoDatabaseFactory) {
		this.gridFsTemplate = gridFsTemplate;
		this.gridFSBucket = GridFSBuckets.create(mongoDatabaseFactory.getMongoDatabase());
	}

	public ResponseEntity<InputStreamResource> getImage(String id) {
	    GridFSFile gridFSFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(new ObjectId(id))));

	    if (gridFSFile == null) {
	        return ResponseEntity.notFound().build();
	    }

	    GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(gridFSFile.getObjectId());
	    InputStreamResource resource = new InputStreamResource(downloadStream);

	    // Define o Content-Type como image/jpeg de forma garantida
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_JPEG);

	    return ResponseEntity.ok().headers(headers).body(resource);
	}

}
