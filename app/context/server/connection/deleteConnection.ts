import getAndDeleteRequest from '../../services/getAndDeleteRequest';

const deleteConnection = async (id: string) => {
    const result = await getAndDeleteRequest('DELETE', `/connection/deleteConnection/${id}`);
    return result as any;
};

export default deleteConnection;
