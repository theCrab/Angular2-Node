let Config = {
    jwt_secret: 'iamalanyo',
    itemAlias: "MMSUploadFile",
    uploadUrl: __dirname + "/uploads/",
    defaultImageUrl: 'default%5Cdefault.jpg',
    //60*60*24*30(30 days)
    tokenExpiresIn: 2592000
}

module.exports = Config;

