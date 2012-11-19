var book = require('../book'),
    util = require('util'),
    fs = require('fs');

var JsonBook = function(path) {
    this.path = path;
    var that = this;
    var watcher = fs.watch(path, function(evt, filename) {
        that.load();
    });
    this.on('end', function() {
        watcher.close();
    });
    this.load();
}

JsonBook.prototype.load = function() {
    this.data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    this.emit('reload');
}

util.inherits(JsonBook, book.Book);

exports.JsonBook = JsonBook;
