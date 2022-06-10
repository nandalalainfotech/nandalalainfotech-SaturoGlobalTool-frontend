import { BaseEntity } from "./BaseEntity";
import { Person001mb } from "./Person001mb";
import { Role001mb } from "./Role001mb";

export class User001mb extends Person001mb {
    personId?: number;
    roleid?: number;
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