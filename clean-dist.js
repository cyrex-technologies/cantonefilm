/* eslint-disable @typescript-eslint/no-require-imports */
// clean-dist.js
const fs = require("fs");
const path = require("path");

function deleteDistFolders(dir) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);

    if (item === "node_modules") continue;

    if (fs.statSync(fullPath).isDirectory()) {
      if (item === "dist" || item === ".next") {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log("Removed:", fullPath);
      } else {
        deleteDistFolders(fullPath);
      }
    }
  }
}

deleteDistFolders(process.cwd());
console.log("Clean complete.");
