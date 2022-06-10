import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Unitlowendvalue001mb } from "../entities/Unitlowendvalue001mb";

@Injectable()
export class UnitlowendvalueManager extends BaseService {
    private unitlowendvalueUrl: string = `${environment.apiUrl}/unitlowendvalue`

    allunitlowendvalue() {
        return this.getCallService(`${this.unitlowendvalueUrl}` + "/findAll");
    }

    unitlowendvaluesave(unitlowendvalue001mb: Unitlowendvalue001mb) {
        return this.postCallService(`${this.unitlowendvalueUrl}` + "/save", {}, unitlowendvalue001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.unitlowendvalueUrl}`, data);
    }

    unitlowendvalueupdate(unitlowendvalue001mb: Unitlowendvalue001mb) {
        return this.putCallService(`${this.unitlowendvalueUrl}` + "/update", {}, unitlowendvalue001mb);
    }

    unitlowendvaluedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.unitlowendvalueUrl}` + "/delete", data);
    }
}