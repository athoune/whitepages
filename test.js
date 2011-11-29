var Book = require('./lib/book').Book,
    Gravatar = require('./lib/gravatar').Gravatar,
    WhitePages = require('./lib/whitepages').WhitePages;

var wp = new WhitePages();
var g = new Gravatar('mathieu@garambrogne.net')
g.jpeg(function(jpeg) {
    var book = new Book([{
            objectclass: ["person", "top" ],
            cn: "Robert Dupond",
            mail: "robert@dupond.com",
            givenname: "Robert",
            sn: "bob",
            ou: "dupondinc",
            jpegphoto: jpeg
          }]);

    wp.read(book);
    wp.listen(1389, '127.0.0.1', function(){
        console.log("Withe pages at %s", wp.ldap.url);
    })

});
