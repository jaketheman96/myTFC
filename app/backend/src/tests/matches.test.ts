import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';
import matchesMocks from './mocks/matches.mocks';
import Imatches from '../interface/matches.interface';

chai.use(chaiHttp);

const { allMatches, matchesTrue, matchesFalse } = matchesMocks;

const { expect } = chai;

describe('Testes da rota /matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Matches, "findAll").resolves(allMatches as any);
  });

  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testa o retorno da funçao getAllMatches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('Teste na rota /matches com query', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testa o retorno da funcao getMatches quando a query é true', async () => {
    sinon.stub(Matches, "findAll").resolves(matchesTrue as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: true })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesTrue)
    chaiHttpResponse.body.forEach((infos: Imatches) => {
      expect(infos.inProgress).to.be.true
    })
  });

  it('Testa o retorno da funcao getMatches quando a query é false', async () => {
    sinon.stub(Matches, "findAll").resolves(matchesFalse as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: false })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesFalse)
    chaiHttpResponse.body.forEach((infos: Imatches) => {
      expect(infos.inProgress).to.be.false
    })
  });
})

