import postAndPutRequest from "../../services/postAndPutRequest";

const uploadMcqsImg = async (data: string) => {
    const image = { image: data }

    const result = await postAndPutRequest("POST", image, `/image/upload`, "direct");
    return result as any;
};

export default uploadMcqsImg;
