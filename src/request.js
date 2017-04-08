function makeRequest(opts) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method, opts.url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        if (opts.headers) {
            Object.keys(opts.headers).forEach(function (key) {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }
        var params = opts.params;

        xhr.send(paramsToString(params));
    });
}


function paramsToString(params) {
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
        let strParams = "";
        let key;
        for (key of Object.keys(params)) {
            let val = params[key];
            if (val) {
                strParams += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + "&";
                //strParams +=  key + '=' + params[key];
            }
        }

        if (strParams.slice(-1) === '&') {
            return strParams.slice(0, -1);
        } else {
            return strParams;
        }
    } else {
        return params;
    }
}


module.exports = {
    makeRequest: makeRequest,
    paramsToString: paramsToString
}