import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Type001mb } from "../entities/Type001mb";



@Injectable()
export class BioTypeManager extends BaseService {
    private bioTypeUrl: string = `${environment.apiUrl}/types`

    allbioType() {
        return this.getCallService(`${this.bioTypeUrl}` + "/findAll");
    }

    bioTypesave(type001mb: Type001mb) {
        return this.postCallService(`${this.bioTypeUrl}` + "/save", {}, type001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.bioTypeUrl}`, data);
    }

    bioTypeupdate(type001mb: Type001mb) {
        return this.putCallService(`${this.bioTypeUrl}` + "/update", {}, type001mb);
    }

    bioTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.bioTypeUrl}` + "/delete", data);
    }
}