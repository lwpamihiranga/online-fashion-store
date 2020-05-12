const jwt = require('jsonwebtoken');
const Roles = require('../_helpers/role');

/**
 * @summary this function checks if the req is made by and admin, userTypes admin & manager
 * created for the purpose of only admins can add managers for the system
 */
exports.checkBeforeAddUser = (req, res, next) => {
    const userType = req.body.type || Roles.User;

    if (userType === Roles.Admin || userType === Roles.StoreManager) {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, 'secret');

            if (user.type === Roles.Admin) {
                // attach admin's email to the req
                req.adminEmail = user.email;
                return next();
            } else {
                return res.status(401).json({
                    error: 'unathorized',
                });
            }
        } catch (err) {
            return res.status(401).json({
                error: 'unathorized',
            });
        }
    }

    next();
};

/**
 * @summary check if the req is made by an admin type user
 */
exports.checkAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token, 'secret');

        if (user.type === Roles.Admin) {
            return next();
        } else {
            return res.status(401).json({
                error: 'unathorized',
            });
        }
    } catch (err) {
        return res.status(401).json({
            error: 'unathorized',
        });
    }
};
