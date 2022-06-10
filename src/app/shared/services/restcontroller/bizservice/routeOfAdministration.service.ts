import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Routeofadministration001mb } from "../entities/Routeofadministration001mb";

@Injectable()
export class RouteofAdminManager extends BaseService {
    private routeofadminTypeUrl: string = `${environment.apiUrl}/routeofadmin`

    allrouteofadminType() {
        return this.getCallService(`${this.routeofadminTypeUrl}` + "/findAll");
    }

    routeofadminTypesave(routeofadministration001mb: Routeofadministration001mb) {
        return this.postCallService(`${this.routeofadminTypeUrl}` + "/save", {}, routeofadministration001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.routeofadminTypeUrl}`, data);
    }

    routeofadminTypeupdate(routeofadministration001mb: Routeofadministration001mb) {
        return this.putCallService(`${this.routeofadminTypeUrl}` + "/update", {}, routeofadministration001mb);
    }

    routeofadminTypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.routeofadminTypeUrl}` + "/delete", data);
    }
}