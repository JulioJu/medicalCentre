import { AbstractServiceMongoose } from '../abstract';
import { PatientSchema } from './';

const PatientMongooseService = {...AbstractServiceMongoose};

PatientMongooseService.constructorStatic(PatientSchema, 'patient');

export { PatientMongooseService };
