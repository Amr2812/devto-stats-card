require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  blogUrl: "dev.to/amrelmohamady",
  dashboardUrl: "https://dev.to/dashboard",
  cookieHeader: process.env.COOKIE_HEADER
};
