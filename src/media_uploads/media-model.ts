export interface PhotoModel {
    id: number,
    file_name: string,
    file_type: string,
    original_file_name: string,
    folder: string,
    size: "T" | "F" // Thumbnail, Full
    tags?: number[],
}

export interface VideoModel {
    id: number,
    file_name: string,
    file_type: string,
    original_file_name: string,
    folder: string,
    tags?: number[],
}

export interface PhotoDataModel {
    id: number,
    file_name: string,
    file_type: string,
    url: string,
    original_file_name: string,
    folder: string,
    size: string
}

export interface VideoDataModel {
    id: number,
    file_name: string,
    file_type: string,
    url: string,
    original_file_name: string,
    folder: string,
}

