var fs = require('fs');
var fileName = 'index';

//读取文件
fs.readFile(fileName+'.html', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    var data2 = data.replace('123','ggg');
	fs.appendFile(fileName+'.txt', data2, function (err) {
	  if (err) throw err;
	});
});
