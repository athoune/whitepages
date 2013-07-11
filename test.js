var Gravatar = require('./lib/gravatar').Gravatar,
    wp = require('./lib/whitepages'),
    WhitePages = wp.WhitePages,
    JsonBook = wp.JsonBook;

var wp = new WhitePages();
var g = new Gravatar('mathieu@garambrogne.net');
g.jpeg(function(avatar) {
    var book = new JsonBook('test.json');
    console.log(book.data);
    wp.read(book);
    wp.listen(1389, '127.0.0.1', function(){
        console.log("White pages at %s", wp.ldap.url);
    });

});
