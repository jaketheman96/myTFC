import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/UsersModel';
import loginMocks from './mocks/login.mocks'

chai.use(chaiHttp);

const { expect } = chai;

const { user1, loginSuccess, token, wrongToken } = loginMocks;

describe('Testes da rota login', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Testa o caso de sucesso de login', async () => {
    sinon.stub(Users, "findOne").resolves(user1 as Users);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginSuccess)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Testa o middleware de campos vazios do login', async () => {
    sinon.stub(Users, "findOne").resolves();

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: user1.password,
      })
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Testa o caso de erro com password invalido', async () => {
    sinon.stub(Users, "findOne").resolves(user1 as Users);
    // em caso de achar o user usando o findOne, porém com password inválido, o stub precisa ter resolves...

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: user1.email,
        password: 'xablau',
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Incorrect email or password')
  });

  it('Testa o caso de erro com email invalido', async () => {
    sinon.stub(Users, "findOne").resolves();

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'adm@adm.com',
        password: user1.password,
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.unauthorized).to.be.true
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Incorrect email or password')
  });

  it('Testa a rota get /login/validate', async () => {
    sinon.stub(Users, "findOne").resolves(user1 as Users);

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.role).to.be.equal('admin')
  });

  it('Testa a rota get /login/validate com caso de erro', async () => {
    sinon.stub(Users, "findOne").resolves();

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', wrongToken)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('INVALID_TOKEN')
  });
});

