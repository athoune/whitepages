/*
 * WhithePages is the main application.
 *
 * It's a read only LDAP server and a REST server (soon).
 *
 */
var ldap = require('ldapjs');

var WhitePages = function() {
    this.ldap = ldap.createServer();
    this.data = [];
    this.basedn = "o=whitepages";

    var that = this;
    this.ldap.search(that.basedn, function(req, res, next) {
        var binddn = req.connection.ldap.bindDN.toString();

        that.data.forEach(function(page) {
            if (req.filter.matches(page.attributes)) {
                res.send(page);
            }
            res.end();
        });
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
        dn: "cn=" + user.cn + ", " + this.basedn,
        attributes: user});
};

/**
 * Start listening
 */
WhitePages.prototype.listen = function(port, ip, cb) {
    this.ldap.listen(port, ip, cb);
};

exports.WhitePages = WhitePages;
