package br.com.fortunecap.contrato.infra.db;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class FileStorageService {

    private final GridFSBucket gridFSBucket;

    @Autowired
    public FileStorageService(MongoDatabaseFactory mongoDatabaseFactory) {
        this.gridFSBucket = GridFSBuckets.create(mongoDatabaseFactory.getMongoDatabase());
    }

    public String uploadFiles(MultipartFile file) throws IOException {

            GridFSUploadOptions options = new GridFSUploadOptions().chunkSizeBytes(1024);
        return gridFSBucket.uploadFromStream(file.getOriginalFilename(), file.getInputStream(), options).toHexString();
    }

    public Optional<InputStream> getFile(String fileId) {
        try {
            return Optional.of(gridFSBucket.openDownloadStream(new ObjectId(fileId)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void deleteFile(String fileId) {
        gridFSBucket.delete(new ObjectId(fileId));
    }
}
