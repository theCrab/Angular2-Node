export class Device {

    constructor(
        public _id: any,
        public deviceId: string,
        public name: string,
        public creator?: Object,
        public createData?: Date,
        public schedule?) {

        this._id = _id;
        this.deviceId = deviceId;
        this.name = name;
        this.creator = creator;
        this.createData = new Date(createData);
        this.schedule = schedule;
    };
}