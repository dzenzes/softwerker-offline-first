var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};





window.onload = () => {
    getJSON("/uuid",
        (err, data) => {
            if (err != null) {
                console.error("Something went wrong: ", err);
            } else {
                document.getElementById('uuid').innerHTML= data.uuid;
            }
        });
}