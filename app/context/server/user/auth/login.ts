import postAndPutRequest from "../../../services/postAndPutRequest";

const LoginHandler = async (data:{} | [] , type:string) => {
  const result = await postAndPutRequest("POST", data, "/auth/login", type);
  return result;
};

export default LoginHandler;
