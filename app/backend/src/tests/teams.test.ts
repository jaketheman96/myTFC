import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mocks';
import Teams from '../database/models/TeamsModel';
import utils from './utils/getType';

chai.use(chaiHttp);

const { getType } = utils;

const { expect } = chai;

const { teams, teamById } = teamsMock;

describe('Testes da rota /teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Teams, "findAll").resolves(teams as any);
    sinon.stub(Teams, "findOne").resolves(teamById as any);
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se o retorno da function getAllTeams é do tipo Array com os times corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(getType(chaiHttpResponse.body)).to.be.equal('array')
    expect(chaiHttpResponse.body[0].team_name).to.be.equal('Avaí/Kindermann')
  });

  it('Verifica o retorno da function getTeamsById em caso de sucesso', async () => {
    const teamId = 10;
    chaiHttpResponse = await chai
      .request(app)
      .get(`/teams/${teamId}`)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(teamById)
  });
});

