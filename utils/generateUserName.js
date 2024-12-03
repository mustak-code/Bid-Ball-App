export default generateUserName = (email) => {
    const userNameFromEmail = email.split("@")[0];
    const userName = userNameFromEmail;
    return userName;
};
