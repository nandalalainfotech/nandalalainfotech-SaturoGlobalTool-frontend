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

    findAllByLigandIdAndAssayId(ligandId:any, assayId: any) {
        console.log("ligandService---->>",ligandId,assayId);
        
        let data: any = {};
        data['ligandId'] = ligandId;
        data['assayId'] = assayId;
        return this.getCallService(`${this.ligandUrl}` + "/findAllByLigandIdAndAssayId",data);
    }

    findInprocesStatus(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.ligandUrl}` + "/findInprocesStatus",data);
    }

    
    findSubmotToQcStatus(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.ligandUrl}` + "/findSubmotToQcStatus",data);
    }

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

    updateStatus(ligandId: any, tanNumber: any) {
        console.log("tanNumber",tanNumber,ligandId)
        let data: any = {};
        data['ligandId'] = ligandId;
        data['tanNumber'] = tanNumber;
        return this.putCallService(`${this.ligandUrl}` + "/updateStatus/"+ligandId+"/"+tanNumber);
    }

    liganddelete(ligandId: any) {
        let data: any = {};
        data['ligandId'] = ligandId;
        return this.deleteCallService(`${this.ligandUrl}` + "/delete", data);
    }
}