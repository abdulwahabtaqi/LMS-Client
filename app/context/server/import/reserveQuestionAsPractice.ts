import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const ReserveQuestionAsPractice = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/imports/reservedQuestions", type);
  return result as ServiceResponse;
};

export default ReserveQuestionAsPractice;
