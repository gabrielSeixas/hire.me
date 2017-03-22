const shortid = require('shortid');
const Url = require('../models/url');
const Responses = require('../responses/url');

exports.create = function(req, res, next) {
	const initTime = new Date().getTime();
	const paramUrl = req.query.url;
	const CUSTOM_ALIAS = req.query.CUSTOM_ALIAS || '';

	if (CUSTOM_ALIAS) {
		Url.findOne({ hash: CUSTOM_ALIAS }, (err, urls) => {
			Responses.returnIfHasErrors(res, err);

			if (urls) {
				Responses.validationError(res, CUSTOM_ALIAS, "CUSTOM ALIAS ALREADY EXISTS");    
			} else {
				createUrl(CUSTOM_ALIAS);
			}
		});
	} else {
		createUrl(shortid.generate());
	}

	function createUrl(hash) {
		createNewUrl(res, paramUrl, hash, (createdUrl) => {
			const timeTaken = new Date().getTime() - initTime;
			Responses.successObjCreation(req, res, createdUrl, `${timeTaken} ms`);
		});
	}
};

exports.access = function(req, res, next) {
	Url.findOne({ hash: req.params.hashUrl }, (err, url) => {
		Responses.returnIfHasErrors(res, err);

		if (url) {
			url.accessCount += 1;
			url.save((err, url) => {
				Responses.returnIfHasErrors(res, err);
				Responses.redirectTo(res, url.fullUrl);
			});
		} else {
			Responses.notFoundError(res, req.params.hashUrl);
		}
	});
};

exports.listAll = function(req, res, next) {
	Url.find({}).sort({ accessCount: 'desc' }).limit(10).exec((err, urls) => {
		Responses.returnIfHasErrors(res, err);
		Responses.success(res, addFullUrls(req, urls));
	});
};

function addFullUrls(req, urls) {
	return urls.map((url) => {
		let urlObject = url.toObject();
		urlObject.shortUrl = `${req.protocol}://${req.headers.host}/u/${url.hash}`;
		return urlObject;
	});
}

function createNewUrl(res, url, hash, callback) {
	let newUrl = new Url({
		fullUrl: url,
		hash,
	});
	newUrl.save((err, createdUrl) => {
		Responses.returnIfHasErrors(res, err);
		if (!err) callback(createdUrl);
	});
}

