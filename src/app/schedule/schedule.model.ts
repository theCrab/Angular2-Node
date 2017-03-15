export class Schedule {

    constructor(
        public scheduleDate: Date,
        public production: Object,
        public device: Object,
        public creator?: Object,
        public createData?: Date,
        public _id?: string,
        public actionDate?: Date,
        public finishDate?: Date) {

        this.scheduleDate = new Date(scheduleDate);
        this.production = production;
        this.device = device;
        this.creator = creator;
        this.createData = new Date(createData);
        this._id = _id;
        this.actionDate = new Date(actionDate);
        this.finishDate = new Date(finishDate);
    }
}