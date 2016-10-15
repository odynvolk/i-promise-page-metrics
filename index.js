"use strict";

const cheerio = require("cheerio");
const rp = require("request-promise");

let checkMozCookie;

module.exports = {

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
    if (checkMozCookie) {
      return module.exports.mozValues(url, proxy, checkMozCookie);
    } else {
      return module.exports.mozCookie(proxy).then(cookie => module.exports.mozValues(url, proxy, cookie));
    }
  },

  mozCookie: (proxy) => {
    const opts = {
      url: "http://www.checkmoz.com/",
      resolveWithFullResponse: true
    };
    if (proxy) opts.proxy = proxy;

    return rp.get(opts)
      .then((data) => {
        checkMozCookie = data.headers["set-cookie"];

        return checkMozCookie;
      });
  },

  mozValues: (url, proxy, cookie) => {
    const opts = {
      url: "http://www.checkmoz.com/",
      headers: {
        Cookie: cookie
      },
      form: {
        "f_urls": url
      }
    };
    if (proxy) opts.proxy = proxy;

    return rp.post(opts)
      .then((data) => {
        const $ = cheerio.load(data);
        const tds = $(".rowclass1 td");

        return {
          da: $(tds[1]).text().trim() || 0,
          pa: $(tds[2]).text().trim() || 0,
          ranks: $(tds[3]).text().trim() || 0,
          links: $(tds[4]).text().trim() || 0
        };
      });
  }
};
