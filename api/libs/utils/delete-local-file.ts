import fs from "node:fs";

const deleteLocalFile = async (path: string) => {
  fs.rm(path, (error) => {
    if (error) {
      console.log(error); // fail silently
    }
    return;
  });
};

export default deleteLocalFile;
