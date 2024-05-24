export interface ListLessonResponse {
    count: number;
    hasNext: boolean;
    hasPrevious: boolean;
    index: number;
    pages: number;
    size: number;
    items: LessonItem[];
}

export interface LessonItem {
    id: number;
    title:string,
    bootcampId: string;
    bootcampName:string;
}