import path from "path";
import fs from "fs";

export const clearImage = (filePath) => {
  filePath = path.join(import.meta.dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
