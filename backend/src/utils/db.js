const mongoose = require('mongoose');

// exports.connectDatabase = () => {
//     mongoose
//         .connect('mongodb://localhost:27017/fashion_store', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         })
//         .then((result) => {
//             console.log('Successfully connected to local MongoDB database');
//         })
//         .catch((err) => {
//             console.log('Error! Failed to connect the local MongoDB database');
//         });
// };

exports.connectDatabase = () => {
    mongoose
        .connect(
            'mongodb+srv://admin:123OnlineFashionStore456@fashion-store-5gi7w.mongodb.net/test?authSource=admin&replicaSet=fashion-store-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        )
        .then((result) => {
            console.log('Successfully connected to cloud MongoDB database');
        })
        .catch((err) => {
            console.log('Error! Failed to connect the cloud MongoDB database');
        });
};
