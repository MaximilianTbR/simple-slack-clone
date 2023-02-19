export class User {
    message: string;
    docs = [];
    creator: string;
    images = [];
    imagesAvailable = false;
    thread = [];
    threadAvailable = false;
    timestamp: Date;


    constructor(obj?: any) {
        this.message = obj ? obj.messageText : '';
        this.creator = obj ? obj.creator : '';
        this.docs = obj ? obj.docs : [];
        this.timestamp = obj ? obj.timestamp : '';
        this.images = obj ? obj.images : [];
        this.thread = obj ? obj.thread : [];
        this.threadAvailable = obj ? obj.threadAvailable : false;
        this.timestamp = obj ? obj.timestamp : 0;
    }

    public toJSON() {
        return {
            messageText: this.message,
            creator: this.creator,
            timestamp: this.timestamp,
            images: this.images
        }
    }
}