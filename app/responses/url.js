
exports.internalError = function() {
    return {
        err_code: "500",
        description: "INTERNAL ERROR",
        alias: hashUrl
    };
};

exports.formatUrlSuccessObj = function(url) {
    return {
        alias: url.hashUrl,
        url: 'http://localhost:8888/u/' + url.hashUrl,
        statistics: {

        }
    };
};

exports.notFound = function(hashUrl) {
    return {
        err_code: "404",
        description: "URL NOT FOUND",
        alias: hashUrl
    };
};

exports.formatNotCreatedResponse = function(customAlias) {
    return {
        alias: customAlias,
        err_code: '001',
        description: "CUSTOM ALIAS ALREADY EXISTS"
    };
};