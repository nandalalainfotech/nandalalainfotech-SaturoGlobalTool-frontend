import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Unitsinglevalue001mb } from "../entities/Unitsinglevalue001mb";

@Injectable()
export class  UnitSingleValueManager extends BaseService {
    private unitSingleValueUrl: string = `${environment.apiUrl}/unitSingleValue`

    allunitSingleValue() {
        return this.getCallService(`${this.unitSingleValueUrl}` + "/findAll");
    }

    unitSingleValuesave(unitsinglevalue001mb: Unitsinglevalue001mb) {
        return this.postCallService(`${this.unitSingleValueUrl}` + "/save", {}, unitsinglevalue001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.unitSingleValueUrl}`, data);
    }

    unitSingleValueupdate(unitsinglevalue001mb: Unitsinglevalue001mb) {
        return this.putCallService(`${this.unitSingleValueUrl}` + "/update", {}, unitsinglevalue001mb);
    }

    unitSingleValuedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.unitSingleValueUrl}` + "/delete", data);
    }
}