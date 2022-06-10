import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { realpath } from "fs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from "../../services/base.service";

@Injectable()
export class appSettingManager extends BaseService {

    // allFiles() {
    //     return this.getCallService('http://localhost:3000/testandreportstudio/api/appsettings/findAll');
    // }

    save(selectedFile: any, clientname: string, clientdescription: string, category: string) {
        var formData: any = new FormData();

        formData.append("file", selectedFile, selectedFile.name);
        formData.append("clientname", clientname);
        formData.append("clientdescription", clientdescription);
        formData.append("insertUser", "sivakumar");
        formData.append("insertDatetime", new Date());
        formData.append("category", category);
        formData.append("contenttype", "contenttype");
        formData.append("created", new Date());
        formData.append("filename", selectedFile.name);
        formData.append("loginuser", "sivakumar");
        formData.append("size", "100mb");
        return this.postCallService1('http://localhost:3000/testandreportstudio/api/appsettings/upload', {}, formData).pipe(
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
}