import { AbstractMongoNativeService } from '../abstract';

const PatientMongoNativeService = {...AbstractMongoNativeService};

PatientMongoNativeService.collection = 'patient';

export { PatientMongoNativeService };
