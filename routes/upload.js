var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

router.post('/', function(req, res, next) {
  // parse a file upload
  var form = new formidable.IncomingForm();
  form.uploadDir = './dist/upload';

  form.parse(req, function(err, fields, files) {

    var extName = '';  //后缀名
    switch (files.image.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;		 
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;		 
    }

    if(extName.length == 0){
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('只支持png和jpg格式图片');
      return;				   
    }

    var imageName = Math.random().toString().split('.')[1] + '.' + extName;
    var newPath = form.uploadDir + '/'+ imageName;
    var resPath = '/upload/' + imageName;

    fs.renameSync(files.image.path, newPath);  //重命名

    res.json({src: resPath});

  });

});

module.exports = router;
