import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchQuestionsForExportHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/exporter/fetch/questions`);
  return result as ServiceResponse;
};

export default fetchQuestionsForExportHandler;
