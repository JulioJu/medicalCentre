import { AbstractBaremongoService } from '../abstract';

const PatientBaremongoService = {...AbstractBaremongoService};

PatientBaremongoService.collection = 'patient';

export { PatientBaremongoService };
