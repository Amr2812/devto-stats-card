const axios = require("axios");
const cheerio = require("cheerio");
const config = require("./config");

module.exports.fetchViewsCountAndFollowers = async () => {
  const { dashboardUrl, cookieHeader } = config;

  const response = await axios.get(dashboardUrl, {
    headers: {
      cookie: cookieHeader
    }
  });

  const $ = cheerio.load(response.data);

  const viewsCount = $(
    "#main-content > header > div.grid.grid-cols-2.gap-2.pt-3 > div:nth-child(3) > strong"
  ).text();

  const followersCount = parseInt(
    $(
      "#main-content > div.crayons-layout__sidebar-left > nav > ul > li:nth-child(3) > a > span"
    ).text()
  );

  return {
    viewsCount,
    followersCount
  };
};
