/**
 * NOTE: create following dir in the server or local development manually
 *      uploads/profile-pics
 *      uploads/products
 *      uploads/other
 */
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('dest req: ', req.baseUrl);
        if (req.baseUrl === '/api/users') {
            return cb(null, './src/utils/uploads/profile-pics');
        } else if (req.baseUrl === '/api/products') {
            return cb(null, './src/utils/uploads/products');
        }

        cb(null, './uploads/other');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
