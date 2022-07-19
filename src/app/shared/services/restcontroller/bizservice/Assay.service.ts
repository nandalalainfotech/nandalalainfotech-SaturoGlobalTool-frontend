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

    allassayTan(username:any, tannumber: any) {
        let data: any = {};
        data['username'] = username;
        data['tannumber'] = tannumber;
        return this.getCallService(`${this.assayUrl}` + "/findAllAssayTan",data);
    }

    allAssayReviewer(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.assayUrl}` + "/allAssayReviewer",data);
    }

    findAllByTanligandID(ligandSlno:any) {
        let data: any = {};
        data['ligandSlno'] = ligandSlno;
        return this.getCallService(`${this.assayUrl}` + "/findAllByTanligandID",data);
    }


    findAllByLigandIdAndAssayId(assayId:any) {
        
        let data: any = {};
        data['assayId'] = assayId;
        return this.getCallService(`${this.assayUrl}` + "/findAllByLigandIdAndAssayId",data);
    }

    findInprocesStatus(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.assayUrl}` + "/findInprocesStatus",data);
    }
    findByReviewer(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.assayUrl}` + "/findByReviewer",data);
    }
    // findByCuratorTan(username:any) {
    //     let data: any = {};
    //     data['username'] = username;
    //     return this.getCallService(`${this.assayUrl}` + "/findByCuratorTan",data);
    // }
    assaysave(assay001wb: Assay001wb) {
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