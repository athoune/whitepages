/*
 * A Book contents users
 *
 * There will be mysql book, mongobook, RESTBook …
 *
 * https://wiki.mozilla.org/MailNews:Mozilla_LDAP_Address_Book_Schema
 * http://erwin.co/2007/11/19/connecting-os-x-address-bookapp-to-ldap/
 * */

var util = require('util'),
    events = require('events');

var Book = function(data, cb) {
    this.data = data || {};
    this.init(cb);
};

util.inherits(Book, events.EventEmitter);

Book.prototype.init = function(cb) {
    cb.call(this);
}

Book.prototype.forEach = function(next) {
    this.data.forEach(next);
};

Book.prototype.end = function() {
    this.emit('end');
}

exports.Book = Book;
