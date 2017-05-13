"use strict";

const cheerio = require("cheerio");
const rp = require("request-promise");

module.exports = {

  alexa: (url, proxy) => {
    const cleanUrl = url.replace("http://", "").replace("https://", "");
    const opts = {
      uri: "https://theseotools.net/alexa-rank-checker/output",
      form: {
        url: cleanUrl,
        submit: "Submit"
      }
    };
    if (proxy) opts.proxy = proxy;

    return rp.post(opts)
      .then((data) => {
        const $ = cheerio.load(data);
        const table = $(".table-bordered tbody");

        return {
          globalRank: $($("td", $("tr", table)[1])[1]).text().trim() || 0,
          popularityAt: $($("td", $("tr", table)[2])[1]).text().trim() || 0,
          regionalRank: $($("td", $("tr", table)[3])[1]).text().trim() || 0,
          backLinks: $($("td", $("tr", table)[4])[1]).text().trim() || 0
        };
      });
  },

  googleplus: (url, proxy) => {
    const opts = {
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
    };
    if (proxy) opts.proxy = proxy;

    return rp.post(opts)
      .then((data) => {
        return data.result.metadata.globalCounts;
      });
  },

  moz: (url, proxy) => {
    return module.exports.mozValues(url, proxy);
  },

  mozValues: (url, proxy) => {
    const cleanUrl = url.replace("http://", "").replace("https://", "");
    const opts = {
      url: `http://www.checkprg.com/lib/multipr-process.html?u=${cleanUrl}`
    };
    if (proxy) opts.proxy = proxy;

    return rp.get(opts)
      .then((data) => {
        const $ = cheerio.load(data);

        return {
          da: $($(".col-md-1 a")[0]).text().trim() || 0,
          pa: $($(".col-md-1 a")[1]).text().trim() || 0,
          ranks: $($(".col-md-1 a")[2]).text().trim() || 0,
          links: $(".col-md-3 a").text().trim() || 0
        };
      });
  }
};
