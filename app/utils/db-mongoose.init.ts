import * as assert from 'assert'
import { URLMONGOOSE } from './const';
// import { Patient } from '../entities/patient/'
import { NurseSchema } from '../entities/nurse'
import { PatientSchema } from '../entities/patient';

import * as mongoose from 'mongoose';

// Not factorised to understand well !
export const dbMongooseInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {

        const initSchema = () => {

            // ========
            // Patients
            // ========
            // ========
            // ========

            /// Patient. Instantiate a new mongoose schema
            // =====================================================
            const patientSchema = new mongoose.Schema(
                new PatientSchema() as any, {timestamps: true}
            );
            // NOTE: methods must be added to the schema before compiling it
            // with mongoose.model()
            // De not use Arrow function because we have a this ! And Arrow
            // function havn't this.
            patientSchema.methods.speak = function() {
                const greeting = this.name
                    ? 'Meow name is ' + this.name
                    : 'I don\'t have a name';
                console.debug(greeting);
            }
            // Instantiate a new mongooose model, from schema
            // (created after work on schema is finished)
            // ================================================
            // The first argument is the singular name of the collection your
            // model is for.  Mongoose automatically looks for the plural
            // version of your model name.
            const patientModel = mongoose.model('Patient', patientSchema);
            // Instantiate a new object to saved
            // =================================
            const patientToSave = new patientModel({
                _id: null,
                _idSSN: '123456789123456',
                _firstname: 'ab',
                _lastname: 'ab',
                _isMale: true,
                _birthday: 'aa',
                _address: 'aa',
                // name not saved because not in the schema
                name: 'validate' });

            // Patient save then validation
            // ==========================
            patientToSave.save((err, patientSaved: any) => {
                if (err) {
                    // console.error(err);
                    console.error(err);
                    // try {
                    //     assert.equal(err.errors['_firstname'].message,
                    //         'Path `name` is required.', null);
                    // } catch(error) {
                    //     console.error(error);
                    // }
                } else {
                    // console.log(err);
                    // assert.equal(err.errors['name'].message,
                    //     'Path `name` is required.');
                    console.debug('You have saved:');
                    console.debug(patientSaved);
                }
            });

            /// =====
            // Nurses
            /// =====
            /// =====
            /// =====

            // Nurses Mongoose Schema
            // =======================
            const nurseSchema = new mongoose.Schema(
                new NurseSchema() as any, {timestamps: true}
            );
            // NOTE: methods must be added to the schema before compiling it
            // with mongoose.model()
            // De not use Arrow function because we have a this ! And Arrow
            // function havn't this.
            nurseSchema.methods.speak = function() {
                // functon havn't this.
                const greeting = this.name
                    ? 'Meow name is ' + this.name
                    : 'I don\'t have a name';
                console.debug(greeting);
            }
            // Nurses model (created after work on schema is finished)
            // =============
            // The first argument is the singular name of the collection your
            // model is for.  Mongoose automatically looks for the plural
            // version of your model name.
            const nurseModel = mongoose.model('Nurse', nurseSchema);

            // Nurse save then validation
            // ==========================
            // ==========================

            // Nurse not saved
            // ==========================
            const nurseNonSaved = new nurseModel({ _id: null,
                name: 'nurseNonSaved' });
            console.debug('nurseNonSaved.id: ' + nurseNonSaved.id);
            console.debug('nurseNonSaved._id: ' + nurseNonSaved._id);
            nurseNonSaved.save((err, saved: any) => {
                if (err) {
                    // console.error(err);
                    try {
                        assert.equal(err.errors['_firstname'].message,
                            'Path firstname is required.', null);
                    } catch (error) {
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

            // Nurse saved
            // ==========
            const nurseSaved = new nurseModel({ _id: null,
                _firstname: 'nurseSaved', _lastname: 'ok' });
            console.debug('nurseSaved.id: ' + nurseSaved.id);
            console.debug('nurseSaved._id: ' + nurseSaved._id);
            nurseSaved.save((err, saved: any) => {
                if (err) {
                    // console.error(err);
                    try {
                        assert.equal(err.errors['_firstname'].message,
                            'Path `name` is required.', null);
                    } catch (error) {
                        console.error(error);
                    }
                }
            });

            // Find patients and nurses
            // =======================
            // =======================
            setTimeout(() => {
                patientModel.find((err, found) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.debug('Collection patientModel:\n ——————————————');
                    console.debug(found);
                });
                nurseModel.find((err, found) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.debug('Collection nurseModels:\n ——————————————');
                    console.debug(found);
                });
            }, 2000);

        }

        // Mongoose connections
        // main()
        // =====================
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

    });

}
