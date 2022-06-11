import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Assay001wb } from "../entities/Assay001wb ";

@Injectable()
export class AssayManager extends BaseService {
    private assayUrl: string = `${environment.apiUrl}/assay`

    allassay(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.assayUrl}` + "/findAll",data);
    }

    assaysave(assay001wb: Assay001wb) {
        console.log("assay001wb----service", assay001wb);
        return this.postCallService(`${this.assayUrl}` + "/save", {}, assay001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.assayUrl}`, data);
    }

    assayupdate(assay001wb: Assay001wb) {
        return this.putCallService(`${this.assayUrl}` + "/update", {}, assay001wb);
    }

    assaydelete(assayId: any) {
        let data: any = {};
        data['assayId'] = assayId;
        return this.deleteCallService(`${this.assayUrl}` + "/delete", data);
    }
}