var book = require('../book'),
    util = require('util'),
    fs = require('fs');

var JsonBook = function(path, cb) {
    this.path = path;
    this.data = [];
    var that = this;
    var watcher = fs.watch(path, function(evt, filename) {
        that.load();
    });
    this.init(cb);
};

util.inherits(JsonBook, book.Book);

JsonBook.prototype.init = function(cb) {
    this.on('end', function() {
        watcher.close();
    });
    this.load();
    if (cb != undefined) {
        cb.call(this);
    }
};

JsonBook.prototype.load = function() {
    this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    this.emit('reload');
};

exports.JsonBook = JsonBook;
