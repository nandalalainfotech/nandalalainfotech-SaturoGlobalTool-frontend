import { BaseEntity } from "./BaseEntity";
import { Role001mb } from "./Role001mb";

export class User001mb extends BaseEntity {
    personId?: number;
    roleid?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    securityquestion?: string;
    securityanswer?: string;
    theme?: string | null;
    rolename?: string;

    role?: Role001mb;
}