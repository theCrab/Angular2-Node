/*-----------------------------Block  UI----------------------------------*/
function blockUi(string) {
    $.blockUI({
        overlayCSS: {
            'z-index': 10000,
            //backgroundColor: '#0B3B17',
        },
        message: '<div class="load-3"><p>' + string + '</p><div class="line"></div><div class="line"></div><div class="line"></div></div>',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            'z-index':10000
        }
    });
}

function unblockUi(string) {
    $.unblockUI({
        onUnblock: function() {
            if (string != null) {
                alert(string);
            }
        }
    });
}