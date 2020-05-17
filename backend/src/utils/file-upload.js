/**
 * NOTE: create following dir in the server or local development manually
 *      uploads/profile-pics
 *      uploads/products
 *      uploads/other
 */
const multer = require('multer');
// const path = require('../../../frontend/src/uploads/profile-pic');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('dest req: ', req.baseUrl);
        if (req.baseUrl === '/api/users') {
            return cb(null,'../../frontend/src/uploads/profile-pic');
        } else if (req.baseUrl === '/api/products') {
            return cb(null,'../../frontend/src/uploads/products');
        }

        cb(null,'../../frontend/src/uploads/other');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
