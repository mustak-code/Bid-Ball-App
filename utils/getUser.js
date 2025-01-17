export default getNewUser = async (email, password) => {
    return await convex.query(api.auth.getUserByEmailAndPassword, {
        email: email,
        password: password,
    });
};
