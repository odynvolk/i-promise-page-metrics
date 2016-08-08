"use strict";

const cheerio = require("cheerio");
const rp = require("request-promise");

module.exports = {

  facebook: (url) => {
    return rp({
      uri: `https://api.facebook.com/method/fql.query?&format=json&query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url="${encodeURIComponent(url)}"`,
      json: true
    }).then((data) => {
      return data[0];
    });
  },

  googleplus: (url) => {
    return rp.post({
      url: "https://clients6.google.com/rpc",
      json: {
        method: "pos.plusones.get",
        id: "p",
        params: {
          nolog: true,
          id: url,
          source: "widget",
          userId: "@viewer",
          groupId: "@self"
        },
        jsonrpc: "2.0",
        key: "p",
        apiVersion: "v1"
      }
    }).then((data) => {
      return data.result.metadata.globalCounts;
    });
  },

  moz: (url) => {
    return rp.post({
      url: "http://www.checkmoz.com/",
      form: {
        "f_urls": url
      }
    }).then((data) => {
      const $ = cheerio.load(data);

      const metricsRow = $(".rowclass1 td");

      return {
        da: $(metricsRow[1]).text(),
        pa: $(metricsRow[2]).text(),
        ranks: $(metricsRow[3]).text(),
        links: $(metricsRow[4]).text()
      };
    });
  }

};
