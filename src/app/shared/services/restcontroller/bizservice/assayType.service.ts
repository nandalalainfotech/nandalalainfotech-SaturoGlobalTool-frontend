import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Assaytype001mb } from "../entities/Assaytype001mb";



@Injectable()
export class AssayTypeManager extends BaseService {
    private assayTypeUrl: string = `${environment.apiUrl}/assaytype`

    allassayType() {
        return this.getCallService(`${this.assayTypeUrl}` + "/findAll");
    }

    assayTypesave(assaytype001mb: Assaytype001mb) {
        return this.postCallService(`${this.assayTypeUrl}` + "/save", {}, assaytype001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.assayTypeUrl}`, data);
    }

    assayTypeupdate(assaytype001mb: Assaytype001mb) {
        return this.putCallService(`${this.assayTypeUrl}` + "/update", {}, assaytype001mb);
    }

    assayTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.assayTypeUrl}` + "/delete", data);
    }
}