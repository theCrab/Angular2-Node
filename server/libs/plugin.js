module.exports.DataDatePlugin = (schema) => {
    schema.add({
        createData: { type: Date, default: new Date() },
        creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        ModifyDate: { type: Date, default: new Date() },
        creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    });

    //Before data save, do this function
    schema.pre('save', function (next) {
        this.ModifyDate = new Date();
        next();
    });
};