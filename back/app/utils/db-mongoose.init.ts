import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';

import { URLMONGOOSE } from './const';

export const dbMongooseInit = async (): Promise<void> =>
    new Promise<void>(
        (resolve: () => void, reject: (e: MongoError) => void): void => {

        mongoose.connect(URLMONGOOSE, {useNewUrlParser: true})
            .catch((e: MongoError) => {
                console.error(e);
                reject(e);
            });

        // https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
        mongoose.set('useCreateIndex', true);

        // https://github.com/Automattic/mongoose/issues/6880
        mongoose.set('useFindAndModify', false);

        const dbMongoose = mongoose.connection;
        dbMongoose.on('error', (e: MongoError) => {
            console.error.bind(console, 'connection error');
            reject(e);
        });
        dbMongoose.once('open', () => {
            console.info('You are connected to ', URLMONGOOSE, '.');
            resolve();
        });

    });
