import { BaseEntity } from "./BaseEntity";

export class Appsettings001mb extends BaseEntity {
    registerid?: number;

    clientname?: string;

    clientdescription?: string;

    category?: string;

    filename?: string;

    loginuser?: string;

    insertUser?: string;

    insertDatetime?: Date;

    updatedUser?: string | null;

    updatedDatetime?: Date | null;

    originalfilename?: string;
}