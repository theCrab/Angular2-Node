export class AlertConfirmModel {
    constructor(
        public title: string,
        public message: any,
        public type?: string) {
        this.title = title;
        if (typeof (this.message) === 'object') {
            this.message = this.message.message;
        } else {
            this.message = message;
        }
        this.type = this.type;
    }
}