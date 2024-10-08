import postAndPutRequest from '../../services/postAndPutRequest';

const updateUser = async (id: string, data: {}) => {
    const result = await postAndPutRequest('PUT', data, `/users/user/${id}`);
    return result as any;
};

export default updateUser;
