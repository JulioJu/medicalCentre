import { URLMONGOOSE } from './const';
import { NurseMongooseService } from '../entities/nurse'
import { PatientMongooseService } from '../entities/patient';

import * as mongoose from 'mongoose';

export const dbMongooseInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {

        const initSchema = () => {

            // ========
            // Patients
            // ========
            PatientMongooseService.insertOrUpdate(
                {
                    _id: null,
                    _idSSN: '223456789123456',
                    _firstname: 'ab',
                    _lastname: 'ab',
                    _isMale: true,
                    _birthday: 'aa',
                    _address: 'aa',
                    // name not saved because not in the schema
                    name: 'validate' });

            // ==========================
            /// =====
            // Nurses
            /// =====

            // // Nurse not saved
            // // ==========================
            NurseMongooseService.insertOrUpdate(
                {_id: null, name: 'nurseNonSaved' }
            );

            // // Nurse saved
            NurseMongooseService.insertOrUpdate(
                {_id: null, _firstname: 'nurseSaved', _lastname: 'ok'
                    , _address: 'Gap' }
            );

            // Find patients and nurses
            // =======================
            // =======================
            setTimeout(() => {
                PatientMongooseService.getRecords()
                    .then((found: any) => {
                        console.debug
                        ('Collection patientModel:\n ——————————————\n' , found);
                    })
                    .catch((error: any) => console.error(error));
                NurseMongooseService.getRecords()
                    .then((found: any) => {
                        console.debug
                        ('Collection nurseModel:\n ——————————————\n', found);
                    })
                    .catch((error: any) => console.error(error));
            }, 8000);

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
