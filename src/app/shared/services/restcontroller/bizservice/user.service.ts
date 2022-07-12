import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { User001mb } from "../entities/User001mb";


@Injectable()

export class UserManager extends BaseService {

  private userUrl: string = `${environment.apiUrl}/user`


  alluser() {
    return this.getCallService(`${this.userUrl}` + "/findAll");
  }

  allcuratorName() {
    return this.getCallService(`${this.userUrl}` + "/allcuratorName");
  }

  allReviewerName() {
    return this.getCallService(`${this.userUrl}` + "/allReviewerName");
  }

  allcurator() {
    return this.getCallService(`${this.userUrl}` + "/findCuratorAll");
  }

  allreviewer() {
    return this.getCallService(`${this.userUrl}` + "/findAllReviewer");
  }

  saveuser(user001mb: User001mb) {
    return this.postCallService(`${this.userUrl}` + "/save", {}, user001mb);
  }

  updateuser(user001mb: User001mb) {
    return this.putCallService(`${this.userUrl}` + "/update", {}, user001mb);
  }

  updateRole(user001mb: User001mb) {
    return this.putCallService(`${this.userUrl}` + "/updateRole", {}, user001mb);
  }

  updateUserName(userName: any) {
    return this.postCallService(`${this.userUrl}` + "/updateUserName", {}, userName);
  }

  updatePassword(user001mb: User001mb) {
    return this.postCallService(`${this.userUrl}` + "/updatePassword", {}, user001mb);
  }

  updateUserTheme(updateTheme: any) {
    return this.postCallService(`${this.userUrl}` + "/updateUserTheme", {}, updateTheme);
  }

  deleteuser(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.userUrl}` + "/delete", data);
  }

// -----------------------------------------USER REGISTRATION---------------------------------------

  registerUser(user001mb: User001mb) {
    return this.postCallService(`${this.userUrl}` + "/regSave", {}, user001mb);
  }

  alluserRegister() {
    return this.getCallService(`${this.userUrl}` + "/registerfindAll");
  }

}