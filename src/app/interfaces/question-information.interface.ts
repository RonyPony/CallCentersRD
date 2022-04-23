export interface QuestionInformation {
    id?: number;
    question: string;
    creationDate: Date;
    enable: boolean;
}

export interface ResponseInformation {
    id:number
    responserName:string
    answerDate:Date
    questionId: number
    userId: number
    responseContent: string

}