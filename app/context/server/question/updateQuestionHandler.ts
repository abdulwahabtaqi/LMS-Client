import postAndPutRequest from "../../services/postAndPutRequest";

const updateQuestionHandler = async (data: {} | [], id: string, type: string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/question/update/${id}`, type);
  return result as any;
};

export default updateQuestionHandler;
