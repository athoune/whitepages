/*
 * A Book contents users
 *
 * There will be mysql book, mongobook, RESTBook …
 *
 * https://wiki.mozilla.org/MailNews:Mozilla_LDAP_Address_Book_Schema
 * http://erwin.co/2007/11/19/connecting-os-x-address-bookapp-to-ldap/
 * */

var util = require('util');

var Book = function(data) {
    this.data = data || {};
};

Book.prototype.forEach = function(next) {
    this.data.forEach(next);
}

exports.Book = Book;
