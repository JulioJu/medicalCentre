import { AbstractBaremongoService } from '../abstract';

const NurseBaremongoService = {...AbstractBaremongoService};

NurseBaremongoService.collection = 'nurse';

export { NurseBaremongoService };
