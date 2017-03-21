
exports.success = function(response, body) {
    response.status(200).json(body);
};

exports.internalError = function(response) {
    response.status(500).json({
        err_code: "500",
        description: "INTERNAL ERROR",
        alias: hashUrl
    });
};

exports.successObjCreation = function(req, res, url, timeTaken) {
    res.status(201).json({
        alias: url.hashUrl,
        url: `${req.protocol}://${req.headers.host}/u/${url.hashUrl}`,
        statistics: {
            time_taken: timeTaken
        }
    });
};

exports.notFoundError = function(response, hashUrl) {
    response.status(404).json({
        err_code: "404",
        description: "URL NOT FOUND",
        alias: hashUrl
    });
};

exports.validationError = function(response, customAlias, description) {
    response.status(400).json({
        alias: customAlias,
        err_code: '001',
        description
    });
};