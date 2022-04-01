require("dotenv").config();
const fs = require("fs");
const path = require("path");

const getAllFiles = function (dirPath, arrayOfFiles, destination) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(
        dirPath + "/" + file,
        arrayOfFiles,
        destination
      );
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  arrayOfFiles.map(function (source) {
    const ext = source.substring(source.lastIndexOf(".")).toLowerCase();
    const filename = source.substring(source.lastIndexOf("/"));

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      fs.copyFileSync(path.resolve(source), destination + filename);
    }
  });

  return arrayOfFiles;
};

getAllFiles(process.env.SOURCE, [], process.env.DESTINATION);
console.log("copied successfully");
