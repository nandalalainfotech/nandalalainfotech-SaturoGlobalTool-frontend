import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Taskallocation001wb } from "../entities/Taskallocation001wb";

@Injectable()
export class TaskAllocationManager extends BaseService {
    private taskallocationUrl: string = `${environment.apiUrl}/taskallocation`

    alltask(username: any) {
        let data: any = {};
        data['username'] = username;
        
        return this.getCallService(`${this.taskallocationUrl}` + "/findAll", data);
    }

    findByTanNo(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.taskallocationUrl}` + "/findByTanNo", data);
    }

    findByReviewerTanNo(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.taskallocationUrl}` + "/findByReviewerTanNo", data);
    }

    tasksave(taskallocation001wb: Taskallocation001wb, selectedFile: any) {
        let formData: any = new FormData();
        formData.append("filename", selectedFile.name);
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("curatorName", "moorthy");
        // formData.append("contenttype", "contenttype");
        // formData.append("filename", selectedFile.name);
      
        return this.postCallService(`${this.taskallocationUrl}` + "/save", {}, formData).pipe(
            catchError(this.errorMgmt)
        )
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }


    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.taskallocationUrl}`, data);
    }

    taskupdate(taskallocation001wb: Taskallocation001wb) {
        return this.putCallService(`${this.taskallocationUrl}` + "/update", {}, taskallocation001wb);
    }

    taskdelete(curatorId: any) {
        let data: any = {};
        data['curatorId'] = curatorId;
        return this.deleteCallService(`${this.taskallocationUrl}` + "/delete", data);
    }

    taskStatusExcel() {
        return this.getCallService1(`${this.taskallocationUrl}` + "/excel");
    }
}