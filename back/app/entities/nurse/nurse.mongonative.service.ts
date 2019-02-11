import { AbstractMongoNativeService } from '../abstract';

const NurseMongoNativeService = {...AbstractMongoNativeService};

NurseMongoNativeService.collection = 'nurse';

export { NurseMongoNativeService };
