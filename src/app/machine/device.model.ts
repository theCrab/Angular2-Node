export class Device {

    constructor(
        public _id: any,
        public deviceId: string,
        public name: string,
        public creator?: Object,
        public data?: Date) {

        this._id = _id;
        this.deviceId = deviceId;
        this.name = name;
        this.creator = creator;
        this.data = new Date(data);
    };
}