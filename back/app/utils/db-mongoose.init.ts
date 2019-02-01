import { URLMONGOOSE } from './const';

import * as mongoose from 'mongoose';

export const dbMongooseInit = async (): Promise<void> =>
    new Promise<void>((resolve, reject) => {

        mongoose.connect(URLMONGOOSE, {useNewUrlParser: true})
            .catch((e: any) => {
                console.error(e);
                reject(e);
            });
        mongoose.set('useCreateIndex', true);
        const dbMongoose = mongoose.connection;
        dbMongoose.on('error', (e) => {
            console.error.bind(console, 'connection error');
            reject(e);
        });
        dbMongoose.once('open', () => {
            console.info('You are connected to ' + URLMONGOOSE + '.');
            resolve();
        });

    });
