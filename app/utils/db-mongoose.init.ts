import * as assert from 'assert'
import { URLMONGOOSE } from './const';
// import { Patient } from '../entities/patient/'
import { NurseSchema } from '../entities/nurse'
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
            // console.log(new Patient( 'abcd', 7, 'abcd', 'abcd', true, 'abcd', 'abcd' ));
            console.log(new NurseSchema());
            const nurseSchema = new mongoose.Schema(
                new NurseSchema() as any, {timestamps: true}
            );
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

            const nurseModel = mongoose.model('nurseModel', nurseSchema);
            // name not saved
            const validateNonOk = new nurseModel({ _id: null,
                name: 'validateNonOk' });
            console.log(validateNonOk.id);
            console.log(validateNonOk._id);
            validateNonOk.save((err, saved: any) => {
                if (err) {
                     // console.error(err);
                    try {
                        assert.equal(err.errors['_firstname'].message,
                            'Path `name` is required.', null);
                    } catch(error) {
                        console.error(error);
                    }
                } else {
                    // console.log(err);
                    // assert.equal(err.errors['name'].message,
                    //     'Path `name` is required.');
                    saved.speak();
                    console.debug('You have saved:');
                    console.debug(saved);
                }
            });

            const vaildateOk = new nurseModel({ _id: null,
                _firstname: 'vaildateOk', _lastname: 'ok' });
            console.log(vaildateOk.id);
            console.log(vaildateOk._id);
            vaildateOk.save((err, saved: any) => {
                if (err) {
                     // console.error(err);
                    try {
                        assert.equal(err.errors['_firstname'].message,
                            'Path `name` is required.', null);
                    } catch(error) {
                        console.error(error);
                    }
                } else {
                    // console.log(err);
                    // assert.equal(err.errors['name'].message,
                    //     'Path `name` is required.');
                    saved.speak();
                    console.debug('You have saved:');
                    console.debug(saved);
                }
            });
            setTimeout(() => {
                nurseModel.find((err, kittFind) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.debug('Elements nurseModel:');
                    console.debug(kittFind);
                });
            }, 2000);
        }
    });
}
