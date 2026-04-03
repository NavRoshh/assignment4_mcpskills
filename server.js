const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 4317;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

http.createServer((request, response) => {
  const requestPath = request.url === "/" ? "/index.html" : request.url;
  const filePath = path.join(root, decodeURIComponent(requestPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    response.end(file);
  });
}).listen(port, "127.0.0.1");
