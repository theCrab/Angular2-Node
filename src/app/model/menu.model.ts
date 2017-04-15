export class Menu {
    public _id: any;
    public routerLink: Array<string>;
    public routerTitle: string;
    public routerIcon: string;
    public routerTitle_E: string;
    public sort: number;
    public isLogin: boolean;
    public roles;
    public creator: Object;

    constructor(obj: any) {
        this._id = obj._id;
        try {
            this.routerLink = obj.routerLink.split('/').slice(1);
        } catch (e) {
            console.log('this url has error');
        }
        this.routerTitle = obj.routerTitle;
        this.routerIcon = obj.routerIcon;
        this.routerTitle_E = obj.routerTitle_E;
        this.sort = obj.sort;
        this.isLogin = obj.isLogin;
        this.roles = obj.roles;
        this.creator = obj.creator;
    };
}