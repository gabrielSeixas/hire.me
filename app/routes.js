const Url = require('./controllers/url');
const Home = require('./controllers/home');

module.exports = function(app) {
    app.get('/', Home.index);
    app.put('/create', Url.create);
    app.get('/routes', Url.listAll);
    app.get('/u/:hashUrl', Url.redirectShort);
    app.get('/delete-all', Url.dropAllUrls);
};