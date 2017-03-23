const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

        let conn = mongoose.connection;

        conn.on('error', reject);

        conn.once('open', () => {
            console.log('Mongoose default connection open to ' + url);
            //complete this connection
            resolve()
        });

        //When the connection is disconnected
        conn.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        //If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            conn.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        mongoose.connect(url);

    });
}