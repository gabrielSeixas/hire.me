
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Url = require('../app/models/url');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Urls', () => {
    beforeEach((done) => {
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
                    res.body.description.should.eql('URL IS NOT VALID');
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
    });
});