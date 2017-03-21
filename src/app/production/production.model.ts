export class Production {

    constructor(
        public name: string,
        public count: string,
        public requireDate: Date,
        public createData?: Date,
        public _id?: string,
        public creator?: string,
        public creatorName?: string,
        public state: boolean = false,
        public finishDate: Date = null,
        public schedule?) {
        this.name = name;
        this.count = count;
        this.requireDate = new Date(requireDate);
        this.createData = new Date(createData);
        this._id = _id;
        this.creator = creator;
        this.creatorName = creatorName;
        this.state = state;
        this.finishDate = finishDate;
        this.schedule = schedule;
    }
}