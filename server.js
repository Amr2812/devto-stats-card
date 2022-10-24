const http = require("http");
const config = require("./config");
const { fetchViewsCountAndFollowers } = require("./scrapper");
const { generateSvg } = require("./svg-generator");

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(404);
    res.end();
    return;
  }

  try {
    const { viewsCount, followersCount } = await fetchViewsCountAndFollowers();
    const svg = generateSvg(viewsCount, followersCount, config.blogUrl);

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: 0
    });
    res.end(svg);
  } catch (err) {
    console.error(err);
  }
});

const PORT = config.port;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
