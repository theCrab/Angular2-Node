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

        this._id = _id;
        this.production = production;
        this.device = device;
        this.creator = creator;

        if (scheduleDate) {
            this.scheduleDate = new Date(scheduleDate);
        }
        if (createData) {
            this.createData = new Date(createData);
        }
        if (actionDate) {
            this.actionDate = new Date(actionDate);
        }
        if (finishDate) {
            this.finishDate = new Date(finishDate);
        }
    }
}