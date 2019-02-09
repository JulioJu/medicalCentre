export type TypesOfIAbstract = string | boolean | number | Date | undefined;

export interface IAbstract  {
    [key: string]: TypesOfIAbstract;
    _id: string;
    _createdAt?: Date;
    updatedAt: Date;
}
