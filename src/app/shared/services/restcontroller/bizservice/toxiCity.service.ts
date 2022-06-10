import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Toxicity001mb } from "../entities/Toxicity001mb";


@Injectable()
export class ToxicityManager extends BaseService {
    private toxicityTypeUrl: string = `${environment.apiUrl}/toxicity`

    alltoxicityType() {
        return this.getCallService(`${this.toxicityTypeUrl}` + "/findAll");
    }

    toxicityTypesave(toxicity001mb: Toxicity001mb) {
        return this.postCallService(`${this.toxicityTypeUrl}` + "/save", {}, toxicity001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toxicityTypeUrl}`, data);
    }

    toxicityTypeupdate(toxicity001mb: Toxicity001mb) {
        return this.putCallService(`${this.toxicityTypeUrl}` + "/update", {}, toxicity001mb);
    }

    toxicityTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toxicityTypeUrl}` + "/delete", data);
    }
}