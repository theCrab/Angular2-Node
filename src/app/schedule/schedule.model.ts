export class Schedule {

    constructor(
        public scheduleDate: Date,
        public production: Object,
        public device: Object,
        public creator?: Object,
        public createData?: Date,
        public _id?: string,
        public actionDate?: Date,
        public finishDate?: Date,
        public temp?: any) { }
}