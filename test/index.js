"use strict";

const pageMetrics = require("../index.js");

describe("i promise page metrics", () => {
  const url = "https://npmjs.com";

  it("should return googleplus data", (done) => {
    pageMetrics.googleplus(url)
      .then((response) => {
        response.count.should.be.above(-1);

        done();
      });
  });

  it("should return moz data", (done) => {
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
