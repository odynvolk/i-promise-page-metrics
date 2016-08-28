"use strict";

const pageMetrics = require("../index.js");

describe("i promise page metrics", () => {
  const url = "https://npmjs.com";

  it("should return facebook data", (done) => {
    pageMetrics.facebook(url)
      .then((response) => {
        response.total_count.should.be.above(280);
        response.like_count.should.be.above(90);
        response.comment_count.should.be.above(50);
        response.share_count.should.be.above(130);

        done();
      });
  });

  it("should return google+ data", (done) => {
    pageMetrics.googleplus(url)
      .then((response) => {
        response.count.should.be.above(-1);

        done();
      });
  });

  it("should return moz data", (done) => {
    pageMetrics.moz(url)
      .then((response) => {
        response.da.should.be.above(10);
        response.pa.should.be.above(10);
        response.ranks.should.equal(0);
        response.links.should.be.above(100);

        done();
      });
  });
});
