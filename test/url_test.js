
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Url = require('../app/models/url');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../configs')(process.env.NODE_ENV);

const should = chai.should();

chai.use(chaiHttp);

describe('Urls', () => {
	beforeEach((done) => {
		Url.remove({}, err => done());
	});

	afterEach((done) => {
		Url.remove({}, err => done());
	});

	describe('PUT /create', () => {
		it('should save valid urls', (done) => {
			chai.request(server)
				.put('/create?url=http://www.google.com')
				.end((err, res) => {
					res.should.have.status(201);
					res.body.alias.should.be.a('string');
					res.body.url.should.be.a('string');
					res.body.statistics.should.be.a('object');
					res.body.statistics.time_taken.should.be.a('string');
					done();
				});
		});

		it('should not save invalid urls', (done) => {
			chai.request(server)
				.put('/create?url=invalid-url')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.alias.should.eql('');
					res.body.err_code.should.eql('001');
					res.body.description.should.eql('url validation failed');
					done();
				});
		});

		it('should save urls with custom alias', (done) => {
			chai.request(server)
				.put('/create?url=http://www.google.com&CUSTOM_ALIAS=bemobi')
				.end((err, res) => {
					res.should.have.status(201);
					res.body.alias.should.eql('bemobi');
					res.body.url.should.contain('bemobi');
					res.body.statistics.should.be.a('object');
					res.body.statistics.time_taken.should.be.a('string');
					done();
				});
		});

		it('should not save urls with repeated custom alias', (done) => {
			(new Url({
				fullUrl: 'https://www.facebook.com/',
				hash: 'bemobi'
			})).save((err, url) => {
				chai.request(server)
					.put('/create?url=https://www.facebook.com/&CUSTOM_ALIAS=bemobi')
					.end((err, res) => {
						res.should.have.status(400);
						res.body.alias.should.eql('bemobi');
						res.body.err_code.should.eql('001');
						res.body.description.should.eql('CUSTOM ALIAS ALREADY EXISTS');
						done();
					});
			});
		});
	});

	describe('GET /urls-list', () => {
		it('should return a ordered list with the most accessed urls', (done) => {

			for (let i = 0; i < 10; i++) {
				(new Url({
					fullUrl: `http://www.url${i}.com`,
					accessCount: i,
					hash: `url${i}`
				})).save();
			}

			chai.request(server)
				.get('/urls-list')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.eql(10);

					res.body[0].accessCount.should.eql(9);
					res.body[1].accessCount.should.eql(8);
					res.body[2].accessCount.should.eql(7);
					done();
				});
		});
	});

	describe('GET /u/:hashUrl', () => {
		it('should redirect to full url', (done) => {
			(new Url({
				fullUrl: 'https://www.facebook.com/',
				hash: 'bemobi'
			})).save((err, url) => {
				chai.request(server)
					.get('/u/bemobi')
					.end((err, res) => {
						res.redirects[0].should.eql('https://www.facebook.com/');
						done();
					});
			});
		});
	});
});