"use strict";

const chai = require("chai");
const expect = require("unexpected");
const chaiHttp = require("chai-http");
const { StatusCodes } = require('http-status-codes');

const { app } = require("../server");
const mock = require("../../__data__/drivers");

chai.use(chaiHttp);
chai.should();

const server = app;

describe("route /", async () => {
  describe("POST Actions drivers /", async () => {
    it("should respond with OK", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "2021-12-16",
            to: "2023-12-16",
            limit: 10,
          },
        })
        .set(headers);
      const bodyAssert = mock.body.sample;
      expect(res.body, "to satisfy", bodyAssert);
      res.should.have.status(StatusCodes.OK);
    });

    it("should validate request body parameters { from }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "wrong",
            to: "2023-12-16",
            limit: 10,
          },
        })
        .set(headers);
      res.should.have.status(StatusCodes.BAD_REQUEST);
    });

    it("should validate request body parameters { to }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "2021-12-16",
            to: "wrong",
            limit: 10,
          },
        })
        .set(headers);
      res.should.have.status(StatusCodes.BAD_REQUEST);
    });

    it("should validate request body parameters { limit }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "2021-12-16",
            to: "2023-12-16",
            limit: 'string',
          },
        })
        .set(headers);
      res.should.have.status(StatusCodes.BAD_REQUEST);
    });

    it("should validate request body parameters { limit }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "2021-12-16",
            to: "2023-12-16",
            limit: '',
          },
        })
        .set(headers);
      res.should.have.status(StatusCodes.BAD_REQUEST);
    });

    it("should validate request body parameters { limit }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "2021-12-16",
            to: "2023-12-16",
          },
        })
        .set(headers);
      const bodyAssert = mock.body.sample;
      expect(res.body, "to satisfy", bodyAssert);
      res.should.have.status(StatusCodes.OK);
    });

    it("should validate request body parameters { from }", async function () {
      const url = "/api/actions/drivers";
      const headers = { Accept: "application/json" };
      const res = await chai
        .request(server)
        .post(url)
        .send({
          input: {
            from: "",
            to: "2023-12-16",
          },
        })
        .set(headers);
      res.should.have.status(StatusCodes.BAD_REQUEST);
    });

  });
});
