import { Assay001wb } from "./Assay001wb ";
import { Ligandtype001mb } from "./Ligandtype001mb";
import { Ligandversion001mb } from "./Ligandversion001mb";


export class Ligand001wb {
    ligandId?: number;
    tanNumber?: string;
    ligandUri?: string;
    ligandVersionSlno?: number | any;
    ligandStatus?: string;
    collection?: string;
    ligandTypeSlno?: number;
    ligandDetail?: string;
    identifier1?: string;
    identifier2?: string;
    identifier3?: string;
    collectionId?: string;
    locator?: string;
    sourceType?: string;
    citation?: string;
    relatedDocument?: string;
    registryNumber?: string;
    diseaseName1?: string;
    diseaseName2?: string;
    diseaseName3?: string;
    target?: string;
    targetVersion?: string;
    targetStatus?: string;
    collectionId1?: string;
    original?: string;
    acronym?: string;
    organism?: string;
    variant?: string;
    status?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    assay001wbs: Assay001wb[] = [];
    ligandVersionSlno2?: Ligandversion001mb;
    ligandTypeSlno2?: Ligandtype001mb;

}