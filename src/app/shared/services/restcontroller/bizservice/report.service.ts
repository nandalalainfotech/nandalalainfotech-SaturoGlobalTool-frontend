import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";



@Injectable()
export class LigandReportsManager extends BaseService {
    private ligandeReportsUrl: string = `${environment.apiUrl}/machineReports`


    machineReportsExcel(username: any) {    
        let data: any = {};
        data['username'] = username;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/excel", data)
    }
    machineReportsTanExcel(reviewerTan: any) {    
        let data: any = {};
        data['reviewerTan'] = reviewerTan;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/Tanexcel", data)
    }

    curatorTanExcel(curatorTanNo: any) {    
        let data: any = {};
        data['curatorTanNo'] = curatorTanNo;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/curatorTanExcel", data)
    }

    batchNumberExportExcel(username: any,rbatchNo: any) {    
        let data: any = {};
        data['username'] = username;
        data['cbatchNo'] = rbatchNo;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/batchNumberExportExcel", data)
    }

    startEndDateExportExcel(username: any,startDate: any,endDate: any) {    
        let data: any = {};
        data['username'] = username;
        data['startDate'] = startDate;
        data['endDate'] = endDate;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/startEndDateExportExcel", data)
    }

    curatorStartEndDateExportExcel(username: any,startDate: any,endDate: any) {    
        let data: any = {};
        data['username'] = username;
        data['startDate'] = startDate;
        data['endDate'] = endDate;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/curatorStartEndDateExportExcel", data)
    }

    curatorBatchNumberExportExcel(username: any,cbatchNo: any) {    
        let data: any = {};
        data['username'] = username;
        data['cbatchNo'] = cbatchNo;
        return this.getCallService1(`${this.ligandeReportsUrl}` + "/curatorBatchNumberExportExcel", data)
    }

}