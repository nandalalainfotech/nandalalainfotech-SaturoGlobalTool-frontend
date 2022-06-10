import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Originalprefix001mb } from "../entities/Originalprefix001mb";

@Injectable()
export class OriginalprefixManager extends BaseService {
    private originalPrefixUrl: string = `${environment.apiUrl}/originalprefix`

    alloriginalPrefix() {
        return this.getCallService(`${this.originalPrefixUrl}` + "/findAll");
    }

    originalPrefixsave(originalprefix001mb: Originalprefix001mb) {
        return this.postCallService(`${this.originalPrefixUrl}` + "/save", {}, originalprefix001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.originalPrefixUrl}`, data);
    }

    originalPrefixupdate(originalprefix001mb: Originalprefix001mb) {
        return this.putCallService(`${this.originalPrefixUrl}` + "/update", {}, originalprefix001mb);
    }

    originalPrefixdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.originalPrefixUrl}` + "/delete", data);
    }
}