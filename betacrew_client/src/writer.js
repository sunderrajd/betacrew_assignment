const fs = require("fs");
const path = require("path");

function writePacketsToFile(
  packets,
  outputPath = path.join(__dirname, "../output/output.json")
) {
  const sorted = packets.sort((a, b) => a.sequence - b.sequence);
  fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2), "utf-8");
  console.log("All packets written to output.json");
}

module.exports = { writePacketsToFile };
