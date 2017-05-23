const max = require('lodash/max');
const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
  let sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  sampleFile = req.files.file;
  const uploadFolder = path.join(__dirname, '..', '..', 'public', 'uploads', 'specials');

  fs.readdir(uploadFolder, (err, folders) => {
    if (err) { return res.status(500).send(err); }

    const folder = Number(max((folders || []).map(f => Number(f))) || 0) + 1;

    fs.mkdir(path.join(uploadFolder, folder + ''), (err) => {
      if (err) { return res.status(500).send(err); }

      sampleFile.mv(path.join(uploadFolder, folder + '', sampleFile.name), function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send({
            path: `specials/${folder}/${sampleFile.name}`
          });
        }
      });
    });
  });
};
