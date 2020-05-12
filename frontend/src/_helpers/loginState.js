
var name = localStorage.getItem('userName');
var password = localStorage.getItem('userPassword');
var type = localStorage.getItem('userType');
var id = localStorage.getItem('userId');
var imageLink = localStorage.getItem('userImageLink');
var email = localStorage.getItem('userEmail');

const Roles = require('../_helpers/role');


exports.isUser = () => {
    return type === Roles.User;
};
exports.isAdmin = () => {
    return type === Roles.Admin;
};
exports.isManager = () => {
    return type === Roles.StoreManager;
};
exports.isLoggedIn = () => {
    return !(id === null || id === '');
};
