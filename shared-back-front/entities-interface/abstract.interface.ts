type typesOfIAbstract = string | boolean | number | Date | undefined;

export interface IAbstract  {
    // FIXME (for eventual JHipster PR)
    // with "noImplicitAny": false in your tsconfig.json compilerOptions
    // section. following code line:
    // [_id: string]: string;
    // Raise error:
    // ERROR in src/app/entities/entities-interface/patient.interface.ts(5,5):
    // error TS2411: Property '_isMale' of type 'boolean' is not assignable to
    // string index type 'string'.

    [key: string]: typesOfIAbstract;
    _id: string;
    _createdAt?: Date;
    _updatedAt?: Date;
}
