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
        
        let data: any = {};
        data['ligandId'] = ligandId;
        data['assayId'] = assayId;
        return this.getCallService(`${this.ligandUrl}` + "/findAllByLigandIdAndAssayId",data);
    }

    findAllByLigandId(ligandId:any) {
        
        let data: any = {};
        data['ligandId'] = ligandId;
        return this.getCallService(`${this.ligandUrl}` + "/findAllByLigandId",data);
    }

    findAllRejected(ligandId:any) {
        
        let data: any = {};
        data['ligandId'] = ligandId;
        return this.getCallService(`${this.ligandUrl}` + "/findAllRejected",data);
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
        let data: any = {};
        data['ligandId'] = ligandId;
        data['tanNumber'] = tanNumber;
        return this.putCallService(`${this.ligandUrl}` + "/updateStatus/"+ligandId+"/"+tanNumber);
    }

    reviewerAcceptStatusUpdate(tanNumber: any) {
        let data: any = {};
        // data['ligandId'] = ligandId;
        data['tanNumber'] = tanNumber;
        console.log("123",tanNumber);
        
        return this.getCallService(`${this.ligandUrl}` + "/reviewerAcceptStatusUpdate",data);
    }

    reviewerRejectStatusUpdate(tanNumber: any) {
        let data: any = {};
        // data['ligandId'] = ligandId;
        data['tanNumber'] = tanNumber;
        console.log("123",tanNumber);
        
        return this.getCallService(`${this.ligandUrl}` + "/reviewerRejectStatusUpdate",data);
    }

    liganddelete(ligandId: any) {
        let data: any = {};
        data['ligandId'] = ligandId;
        return this.deleteCallService(`${this.ligandUrl}` + "/delete", data);
    }
}