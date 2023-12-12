import postAndPutRequest from "../../../services/postAndPutRequest";

const RegistrationHandler = async (data:{} | [], type:string) => {
  const result = await postAndPutRequest("POST", data, "/auth/registration", type);
  return result;
};

export default RegistrationHandler;
