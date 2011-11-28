var Book = require('./lib/book').Book,
    WhitePages = require('./lib/whitepages').WhitePages;

var wp = new WhitePages();
var book = new Book([{
        objectclass: [ "top" ],
        cn: "Robert Dupond",
        mail: "robert@dupond.com",
        givenname: "Robert",
        sn: "bob",
        ou: "dupondinc"
      }]);

wp.read(book);
wp.listen(1389, '127.0.0.1', function(){
    console.log("Withe pages at %s", wp.ldap.url);
})
