import { URLMONGOOSE } from './';
import * as mongoose from 'mongoose';

export const dbMongooseInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        mongoose.connect(URLMONGOOSE);
        const dbMongoose = mongoose.connection;
        dbMongoose.on('error', (e) => {
            console.error.bind(console, 'connection error:')
            reject(e)
        });
        dbMongoose.once('open', () => {
            console.info('You are connected to ' + URLMONGOOSE + '.');
            initSchema();
            resolve();
        });

        const initSchema = () => {
            const nurseMyShema = {
                name: String,
            }
            console.debug(nurseMyShema);
            const nurseSchema = new mongoose.Schema({
                nurseMyShema
            });
            // NOTE: methods must be added to the schema before compiling it
            // with mongoose.model()
            // De not use Arrow function because we have a this ! And Arrow
            // function havn't this.
            nurseSchema.methods.speak = function() {
                const greeting = this.name
                    ? 'Meow name is ' + this.name
                    : 'I don\'t have a name';
                console.debug(greeting);
            }

            const Kitten = mongoose.model('Kitten', nurseSchema);
            const silence: any = new Kitten({ name: 'Silence' });
            console.debug(silence.name);
            const fluffy = new Kitten({ name: 'fluffy' });
            fluffy.save((err, saved: any) => {
                if (err) {
                    return console.error(err);
                }
                console.debug('coucou');
                saved.speak();
                console.debug('coucou');
            });

            setTimeout(() => {
                Kitten.find((err, kittFind) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.debug('coucou2');
                    console.debug('coucou2');
                });
            }, 2000);
        }
    });
}
