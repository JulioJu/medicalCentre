import { IAbstract } from
    './../../entities/entities-interface/abstract.interface';

// Used in:
// front/src/app/entities/abstract/abstract-form.dynamic-form.component.ts
// back/app/entities/abstract/abstract.route.ts
// back/app/entities/abstract/abstract.service.ts
// =========

export interface IFormPutSuccess {
    isupdate: boolean;
    entity: IAbstract;
}
