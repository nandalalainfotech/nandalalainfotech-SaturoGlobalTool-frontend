import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Category001mb } from "../entities/Category001mb";


@Injectable()
export class CategoryManager extends BaseService {
    private categoryTypeUrl: string = `${environment.apiUrl}/category`

    allcategoryType() {
        return this.getCallService(`${this.categoryTypeUrl}` + "/findAll");
    }

    categoryTypesave(category001mb: Category001mb) {
        return this.postCallService(`${this.categoryTypeUrl}` + "/save", {}, category001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.categoryTypeUrl}`, data);
    }

    categoryTypeupdate(category001mb: Category001mb) {
        return this.putCallService(`${this.categoryTypeUrl}` + "/update", {}, category001mb);
    }

    categoryTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.categoryTypeUrl}` + "/delete", data);
    }
}