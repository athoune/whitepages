/*
 * WhithePages is the main application.
 *
 * It's a read only LDAP server and a REST server (soon).
 *
 */
var ldap = require('ldapjs');

var WhitePages = function(basedn) {
    this.ldap = ldap.createServer();
    this.data = [];
    this.basedn = basedn;

    var that = this;

    var authorize = function(req, res, next) {
        return next();
    };

    this.ldap.search(that.basedn, authorize, function(req, res, next) {
        var dn = req.dn.toString();
        if (dn != that.basedn) {
            return next(new ldap.NoSuchObjectError(dn));
        }
        var binddn = req.connection.ldap.bindDN.toString();

        console.log('filter', req.filter.toString());
        that.data.forEach(function(page) {
            if (req.filter.matches(page.attributes)) {
                res.send(page);
            }
        });
        res.end();
    });
    this.ldap.bind(this.basedn, function(req, res, next) {
        var username = req.dn.toString(),
            password = req.credentials;
    console.log("username/password", username, password);

        //if (!userinfo.hasOwnProperty(username) ||
             //userinfo[username].pwd != password) {
          //return next(new ldap.InvalidCredentialsError());
        //}

        res.end();
        return next();
    });
};

/**
 * Read a book
 */
WhitePages.prototype.read = function(book) {
    var that = this;
    book.forEach(function(page) {
        that.user(page);
    });
};

/**
 * Add a user to the white pages.
 */
WhitePages.prototype.user = function(user) {
    this.data.push({
        dn: "uid=" + user.uid + ", " + this.basedn,
        attributes: user});
};

/**
 * Start listening
 */
WhitePages.prototype.listen = function(port, ip, cb) {
    this.ldap.listen(port, ip, cb);
};

exports.WhitePages = WhitePages;
exports.Book = require('./book/index.js').Book;
exports.JsonBook = require('./book/file.js').JsonBook;
