var crypto = require('crypto'),
    fs = require('fs'),
    http = require('http');

function Gravatar(mail) {
    this.mail = mail;
}

Gravatar.prototype.hash = function() {
    md = crypto.createHash('md5');
    md.update(this.mail);
    return md.digest('hex');
}

Gravatar.prototype.jpeg = function(cb) {
    var options = {
        host: 'gravatar.com',
        port: 80,
        path: '/avatar/' + this.hash() + '.jpg'
    };
    http.get(options, function(res) {
        var size = parseInt(res.headers['content-length'], 10);
        var jpg = new Buffer(size);
        var copied = 0;
        res.on('data', function(chunk) {
            chunk.copy(jpg, copied);
            copied += chunk.length;
        });
        res.on('end', function() {
            cb(jpg.toString('binary'));
            fs.open('/tmp/toto.jpg', 'w', function(err, fd) {
                fs.writeSync(fd, jpg, 0, size, 0);
                fs.close(fd);
            });
        })
    });
}

exports.Gravatar = Gravatar
