import question from "../domain/qa/question"

type QAResponse = {
    data: question[],
    status:number
}
export default QAResponse