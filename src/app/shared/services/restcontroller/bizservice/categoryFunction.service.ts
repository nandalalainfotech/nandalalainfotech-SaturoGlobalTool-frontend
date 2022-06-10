import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Categoryfunction001mb } from "../entities/Categoryfunction001mb";

@Injectable()
export class CategoryfunctionManager extends BaseService {
    private categoryfunctionUrl: string = `${environment.apiUrl}/categoryfunction`

    allcategoryFunction() {
        return this.getCallService(`${this.categoryfunctionUrl}` + "/findAll");
    }

    categoryFunctionsave(categoryfunction001mb: Categoryfunction001mb) {
        return this.postCallService(`${this.categoryfunctionUrl}` + "/save", {}, categoryfunction001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.categoryfunctionUrl}`, data);
    }

    categoryFunctionupdate(categoryfunction001mb: Categoryfunction001mb) {
        return this.putCallService(`${this.categoryfunctionUrl}` + "/update", {}, categoryfunction001mb);
    }

    categoryFunctiondelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.categoryfunctionUrl}` + "/delete", data);
    }
}