import { BaseEntity } from "./BaseEntity";

export class Emailattachment001mb extends BaseEntity {
    emailattachmentid?: number;
    content?: Buffer | null;
    contenttype?: string | null;
    emailId?: string | null;
    filename?: string | null;
    filesize?: string | null;
}