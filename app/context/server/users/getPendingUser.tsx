import getAndDeleteRequest from '../../services/getAndDeleteRequest';

const getPendingUsers = async () => {
    const result = await getAndDeleteRequest('GET', `/users/all/unapproved`);
    return result as any;
};

export default getPendingUsers;
