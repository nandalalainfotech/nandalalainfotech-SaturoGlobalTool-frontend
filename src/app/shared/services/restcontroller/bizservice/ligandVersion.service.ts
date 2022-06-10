import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Ligandversion001mb } from "../entities/Ligandversion001mb";




@Injectable()
export class LigandVersionManager extends BaseService {
    private ligandVersionUrl: string = `${environment.apiUrl}/version`

    allligandVersion() {
        return this.getCallService(`${this.ligandVersionUrl}` + "/findAll");
    }

    ligandVersionsave(ligandversion001mb: Ligandversion001mb) {
        return this.postCallService(`${this.ligandVersionUrl}` + "/save", {}, ligandversion001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.ligandVersionUrl}`, data);
    }

    ligandVersionupdate(ligandversion001mb: Ligandversion001mb) {
        return this.putCallService(`${this.ligandVersionUrl}` + "/update", {}, ligandversion001mb);
    }

    ligandVersiondelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.ligandVersionUrl}` + "/delete", data);
    }
}