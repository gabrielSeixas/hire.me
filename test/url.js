
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Url = require('../app/models/url');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Urls', () => {
    beforeEach((done) => {});
});