import { Assay001wb } from "./Assay001wb ";
import { Ligandversion001mb } from "./Ligandversion001mb";

export class Measurement001wb {
    measurementId?: number;
    assaySlno?: number;
    dataLocator?: string;
    categorySlno?: number;
    functionSlno?: number;
    parameter?: string;
    parameterDetail?: string;
    originalPrefixSlno?: number;
    unit?: string;
    singleValue?: string;
    highEndValue?: string;
    lowEndValue?: string;
    units?: string;
    nonNumeric?: string;
    remark?: string;
    typeSlno?: number;
    cell?: string;
    cellDetail?: string;
    organ?: string;
    organDetail?: string;
    species?: string;
    speciesDetail?: string;
    gender?: string;
    ageGroup?: string;
    status?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    // assaySlno2?: Assay001wb[];

}