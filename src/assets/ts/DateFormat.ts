export module DateFormat {
    export function dhms(t) {
        let cd: any = 24 * 60 * 60 * 1000,
            ch: any = 60 * 60 * 1000,
            d: any = Math.floor(t / cd),
            h: any = '0' + Math.floor((t - d * cd) / ch),
            m: any = '0' + Math.round((t - d * cd - h * ch) / 60000),
            s: any = '0' + Math.round((t - d * cd - h * ch - m * 1000) / 1000);
        return [d, h.substr(-2), m.substr(-2), s.substr(-2)].join(':');
    }
}