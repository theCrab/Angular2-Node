//Alan:dowhat~~案確定後要去哪裡
window.alert = function (msg, dowhat, dofunction) {
    //swal(msg);
    swal({
        title: msg,
        confirmButtonColor: "#00793c",
        customClass: "defaultFont",
        confirmButtonText: $('#MainOK').text(),
        //Alan:一定要點確定按鈕
        allowEscapeKey: false
    }, function () {
        if (dowhat != undefined) {
            location.href = dowhat;
        }
        if (dofunction != undefined) {
            dofunction();
        }
    });
};

//Alan:dofunction後要做的事情
window.confirm = function (msg, dofunction, id, cancelfunction) {
    swal({
        title: msg,
        type: "warning",
        showCancelButton: true,
        customClass: "defaultFont",
        confirmButtonColor: "#00793c",
        confirmButtonText: $('#MainOK').text(),
        cancelButtonText: $('#MainCancel').text()
    }, function (isConfirm) {
        if (isConfirm) {
            if (dofunction != undefined) {
                if (id != undefined) {
                    dofunction(id);
                } else {
                    dofunction();
                }
            }
        } else {

            if (cancelfunction != undefined) {
                cancelfunction();
            }
        }
    });
    return false;
};