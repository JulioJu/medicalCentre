import { AbstractServiceMongoose } from '../abstract';
import { NurseSchema } from './';

const NurseMongooseService = {...AbstractServiceMongoose};

NurseMongooseService.constructorStatic(NurseSchema, 'nurse');

export { NurseMongooseService };
