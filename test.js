var Book = require('./lib/book').Book,
    Gravatar = require('./lib/gravatar').Gravatar,
    WhitePages = require('./lib/whitepages').WhitePages;

var wp = new WhitePages();
var g = new Gravatar('mathieu@garambrogne.net');
g.jpeg(function(avatar) {
    var book = new Book([{
            objectclass: ["person", "top" ],
            cn: ["Robert Dupond junior", "Blob"],
            mail: "robert@dupond.com",
            givenname: "Robert",
            sn: "Dupont",
            o: "dupondinc",
            ou: "sales",
            'jpegPhoto;binary': avatar,
            c: "france",
            labeledURI: "http://github.com",
            nickname: "Bob",
            xmozillanickname: "Bob le mozillien",
            info: "more infos",
            uid: "rdupond",
            description: "Description",
            displayName: "RoBeRt"
          }]);
    wp.read(book);
    wp.listen(1389, '127.0.0.1', function(){
        console.log("White pages at %s", wp.ldap.url);
    });

});
