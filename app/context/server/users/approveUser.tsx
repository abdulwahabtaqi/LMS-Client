import postAndPutRequest from '../../services/postAndPutRequest';

const approveUser = async (id: string) => {
    const result = await postAndPutRequest('PUT', {}, `/users/approve/${id}`);
    return result as any;
};

export default approveUser;
