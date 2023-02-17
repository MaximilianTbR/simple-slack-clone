export class User {
    userName: string;
    userId: string;
    userMail: string;
    status: string;
    userPP: string;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userMail = obj ? obj.userMail : '';
        this.status = obj ? obj.status : '';
        this.userPP = obj ? obj.userPP : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userMail: this.userMail,
            status: this.status,
            userPP: this.userPP
        }
    }
}