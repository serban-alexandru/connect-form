import { loginSchema } from "./utils/schema";

const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const path = reqUrl.pathname;
  const method = req.method;

  // GET request to fetch all data
  if (path === "/data" && method === "GET") {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
      const jsonData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jsonData));
    });
  }

  // POST request to add new data
  else if (path === "/data" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newData = JSON.parse(body);

      const parsedData = loginSchema.parse(newData);

      fs.readFile("data.json", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
        fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Internal Server Error" }));
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newData));
        });
      });
    });
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
