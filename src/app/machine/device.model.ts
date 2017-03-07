export class Device {
    public _id: any;
    public deviceId: string;
    public name: string;
    public creator?: Object;
    public data?: Object;

    constructor(_id: any, deviceId: string, name: string, creator?: Object, data?: Object, isEdit?: boolean) {
        this._id = _id;
        this.deviceId = deviceId;
        this.name = name;
        this.creator = creator;
        this.data = data;
    };
}