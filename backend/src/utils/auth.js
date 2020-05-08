const jwt = require('jsonwebtoken');

/**
 * @summary this function checks if the req is made by and admin, userTypes admin & manager
 * created for the purpose of only admins can add managers for the system
 */
exports.checkAdmin = (req, res, next) => {
    const userType = req.body.type || 'user';

    if (userType === 'admin' || userType === 'manager') {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, 'secret');

            if (user.type === 'admin') {
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
