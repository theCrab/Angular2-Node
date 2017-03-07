export class Production {

    constructor(
        public name: string,
        public count: string,
        public requireDate: Date,
        public _id?: string,
        public creator?: string,
        public creatorName?: string,
        public createData?: string,
        public temp?: any) { }
}