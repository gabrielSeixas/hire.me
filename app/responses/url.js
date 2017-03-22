
exports.success = function(response, body) {
    response.status(200).json(body);
};

exports.returnIfHasErrors = function(response, error) {
    if (error && !error.message.includes('validation')) {
        response.status(500).json({
            err_code: "003",
            description: error.message,
            error: error.errors
        });
    } else if (error && error.message.includes('validation')) {
        exports.validationError(response, '', error.message);
    }
};

exports.successObjCreation = function(req, res, url, timeTaken) {
    res.status(201).json({
        alias: url.hash,
        url: `${req.protocol}://${req.headers.host}/u/${url.hash}`,
        statistics: {
            time_taken: timeTaken
        }
    });
};

exports.notFoundError = function(response) {
    response.status(404).json({
        err_code: "002",
        description: "SHORTENED URL NOT FOUND"
    });
};

exports.validationError = function(response, customAlias, description) {
    response.status(400).json({
        alias: customAlias,
        err_code: '001',
        description
    });
};

exports.redirectTo = function(response, destiny) {
    response.status(302).redirect(destiny);
};