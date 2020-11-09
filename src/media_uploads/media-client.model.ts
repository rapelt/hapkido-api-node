import moment, {Moment} from "moment";
import {Class} from "../entity/class";
import {ClassType} from "../entity/class-type";
import {Media} from "../entity/media";

export class MediaClientModel {
    id!: number;
    file_name!: string;
    file_type!: string;
    original_file_name!: string;
    folder!: string;
    size?: string;
    url!: string;
    tags?: number[];
    uploadStatus!: string;
    publishedStatus!: string;
    views!: number;

    dbToClient(db: Media): MediaClientModel {
        const client = new MediaClientModel();

        client.file_name = db.file_name;
        client.file_type = db.file_type;
        client.folder = db.folder;
        client.original_file_name = db.original_file_name;
        client.publishedStatus = db.publishedStatus;
        client.uploadStatus = db.uploadStatus;
        client.size = db.size;
        client.views = db.views;
        client.url = db.url;


        return client;
    }

    clientToDB(client: MediaClientModel): Media {
        const media =  new Media();

        media.id = client.id;
        media.file_name = client.file_name;
        media.file_type = client.file_type;
        media.folder = client.folder;
        media.original_file_name = client.original_file_name;
        media.publishedStatus = client.publishedStatus;
        media.uploadStatus = client.uploadStatus;
        media.size = client.size || '';
        media.views = client.views;
        media.url = client.url;

        return media;
    }

    clientToNewDB(file_name: string, file_type: string, folder: string, size: string): Media {
        const media =  new Media();

        media.file_name = file_name;
        media.file_type = file_type;
        media.folder = folder;
        media.publishedStatus = 'Draft';
        media.uploadStatus = 'In Progress';
        media.size = size;
        media.views = 0;
        media.url = '';


        return media;
    }
}
