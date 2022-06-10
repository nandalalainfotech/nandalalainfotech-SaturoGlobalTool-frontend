import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Ligandtype001mb } from "../entities/Ligandtype001mb";


@Injectable()
export class LigandTypeManager extends BaseService {
    private ligandTypeUrl: string = `${environment.apiUrl}/type`

    allligandType() {
        return this.getCallService(`${this.ligandTypeUrl}` + "/findAll");
    }

    ligandTypesave(ligandtype001mb: Ligandtype001mb) {
        return this.postCallService(`${this.ligandTypeUrl}` + "/save", {}, ligandtype001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.ligandTypeUrl}`, data);
    }

    ligandTypeupdate(ligandtype001mb: Ligandtype001mb) {
        return this.putCallService(`${this.ligandTypeUrl}` + "/update", {}, ligandtype001mb);
    }

    ligandTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.ligandTypeUrl}` + "/delete", data);
    }
}