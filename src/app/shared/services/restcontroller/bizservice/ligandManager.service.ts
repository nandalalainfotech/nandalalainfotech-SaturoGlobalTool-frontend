import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Ligand001wb } from "../entities/Ligand001wb";



@Injectable()
export class LigandManager extends BaseService {
    private ligandUrl: string = `${environment.apiUrl}/ligand`

    allligand(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.ligandUrl}` + "/findAll",data);
    }

    // findByCuratorTan(username:any) {
    //     let data: any = {};
    //     data['username'] = username;
    //     return this.getCallService(`${this.ligandUrl}` + "/findByCuratorTan",data);
    // }

    ligandsave(ligand001wb: Ligand001wb) {
        return this.postCallService(`${this.ligandUrl}` + "/save", {}, ligand001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.ligandUrl}`, data);
    }

    ligandupdate(ligand001wb: Ligand001wb) {
        return this.putCallService(`${this.ligandUrl}` + "/update", {}, ligand001wb);
    }

    liganddelete(ligandId: any) {
        let data: any = {};
        data['ligandId'] = ligandId;
        return this.deleteCallService(`${this.ligandUrl}` + "/delete", data);
    }
}