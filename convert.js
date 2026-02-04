const potrace = require("potrace");
const fs = require("fs");

potrace.trace("input.png", {
  threshold: 180,
  turdSize: 5,
  optCurve: true,
  optTolerance: 0.2
}, function (err, svg) {
  if (err) throw err;
  fs.writeFileSync("output.svg", svg);
  console.log("High quality SVG created!");
});
