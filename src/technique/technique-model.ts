export interface TechniqueModel {
    id: number,
    title: string,
    description?: string,
    grade: number,
    techniqueSet: number
    tags?: number[],
    videos?: number[],
    photos?: number[]
}

export interface TechniqueDataModel {
    t_id: number,
    t_title: string,
    t_description?: string,
    t_grade: number,
    t_set: number
}

export interface TechniqueGroupModel {
    id: number,
    title: string,
}

export interface TechniqueGroupDataModel {
    id: number,
    name: string,
}

