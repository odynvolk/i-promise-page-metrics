"use strict";

const fs = require("fs");
const nock = require("nock");

const pageMetrics = require("../index");

const checkPrg = fs.readFileSync("./test/data/check-prg-response.html", "utf8");
const googlePlus = require("./data/google-plus-response.json");
const seoToolsAlexa = fs.readFileSync("./test/data/seotools-alexa-response.html", "utf8");

describe("i promise page metrics", () => {
  const url = "https://npmjs.com";

  it("should return alexa data", (done) => {
    nock("https://theseotools.net")
      .post("/alexa-rank-checker/output")
      .reply(200, seoToolsAlexa);

    pageMetrics.alexa(url)
      .then((response) => {
        response.globalRank.should.be.above(1000);
        response.popularityAt.should.equal("United States");
        response.regionalRank.should.be.above(1400);
        response.backLinks.should.be.above(200);

        done();
      });
  });

  it("should return googleplus data", (done) => {
    nock("https://clients6.google.com")
      .post("/rpc")
      .reply(200, googlePlus);

    pageMetrics.googleplus(url)
      .then((response) => {
        response.count.should.be.above(-1);

        done();
      });
  });

  it("should return moz data", (done) => {
    nock("http://www.checkprg.com")
      .get("/lib/multipr-process.html?u=npmjs.com")
      .reply(200, checkPrg);

    pageMetrics.moz(url)
      .then((response) => {
        response.da.should.be.above(70);
        response.pa.should.be.above(60);
        response.ranks.should.be.above(5);
        response.links.should.be.above(100);

        done();
      });
  });
});
