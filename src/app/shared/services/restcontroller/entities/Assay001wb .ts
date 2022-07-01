import { Assaytype001mb } from "./Assaytype001mb";
import { Category001mb } from "./Category001mb";
import { Categoryfunction001mb } from "./Categoryfunction001mb";
import { Ligand001wb } from "./Ligand001wb";
import { Ligandversion001mb } from "./Ligandversion001mb";
import { Originalprefix001mb } from "./Originalprefix001mb";
import { Routeofadministration001mb } from "./Routeofadministration001mb";
import { Toxicity001mb } from "./Toxicity001mb";
import { Type001mb } from "./Type001mb";
import { Unitlowendvalue001mb } from "./Unitlowendvalue001mb";
import { Unitsinglevalue001mb } from "./Unitsinglevalue001mb";

export class Assay001wb {
    assayId?: number;
    ordinal?: string;
    collectionId?: string;
    ligandSlno?: number;
    assayTypeSlno?: number;
    toxiCitySlno?: number;
    routeSlno?: number;
    ligandSvalue?: string;
    unitSlno?: number;
    ligandHvalue?: string;
    ligandLvalue?: string;
    unitsSlno?: number;
    administration?: string;
    procedure?: string;
    // target?: string;
    conditionType?: string;
    conditionMaterial?: string;
    conditionMaterialid?: string;
    singleCondition?: string;
    singleUnit?: string;
    highCondition?: string;
    lowCondition?: string;
    highLowUnit?: string;
    unitedSlno?: number;
    status?: string;


    dataLocator?: string | any;
    dataLocator1?: string | null;
    dataLocator2?: string | null;
    dataLocator3?: string | null;
    categorySlno?: number;
    functionSlno?: number;
    parameter?: string;
    parameterDetail?: string;
    singleValue?: string;
    unit?: string;
    originalPrefixSlno?: number;
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
    gender?: string | null;
    ageGroup?: string;

    target?: string;
    targetVersion?: string;
    targetStatus?: string;
    collectionId1?: string;
    original?: string;
    acronym?: string;
    organism?: string;
    variant?: string;
    
    insertUser?: string |any;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    ligandSlno2?: Ligand001wb;
    assayTypeSlno2?: Assaytype001mb;
    toxiCitySlno2?: Toxicity001mb;
    routeSlno2?: Routeofadministration001mb;
    unitSlno2?: Unitsinglevalue001mb;
    unitedSlno2?: Unitlowendvalue001mb;
   
    categorySlno2?: Category001mb;
    functionSlno2?: Categoryfunction001mb;
    originalPrefixSlno2?: Originalprefix001mb;
    typeSlno2?: Type001mb;
    
}
