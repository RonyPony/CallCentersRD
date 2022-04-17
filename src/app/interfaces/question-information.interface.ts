export interface QuestionInformation {
    id?: number;
    question: string;
    creationDate: Date;
    enable: boolean;
}

export interface ResponseInformation {
    questionId: number
    userId: number
    responseContent: string
}