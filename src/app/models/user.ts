export class User {
    userName: string;
    userId: string;
    userMail: string;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userMail = obj ? obj.userMail : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userMail: this.userMail,
        }
    }
}