/*
 * A Book contents users
 *
 * There will be mysql book, mongobook, RESTBook …
 *
 * */

var util = require("util");

var Book = function(data) {
    this.data = data || {};
};

Book.prototype.forEach = function(next) {
    this.data.forEach(next);
}

exports.Book = Book;
