import { BaseEntity } from "./BaseEntity";

export class Registration001mb extends BaseEntity  {
    registerid?: number;
    firstname?: string;
    lastname?: string;
    domain?: string;
    username?: string;
    securityquestion?: string;
    securityanswer?: string;
    message?: string | null;
    status?: string;
    email?: string;
}