import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";



@Injectable()
export class LigandReportsManager extends BaseService {
    private ligandeReportsUrl: string = `${environment.apiUrl}/machineReports`


    machineReportsExcel() {    
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/excel", )
    }

}