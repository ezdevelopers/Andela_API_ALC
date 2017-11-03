var Book = function (book) {
    this.id = ko.observable(book._id);
    this.name = ko.observable(book.name);
    this.isbn = ko.observable(book.isbn);
    this.author = ko.observable(book.author);
    this.description = ko.observable(book.description);
}

var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray([]);

    $.ajax({
        type: "GET",
        crossOrigin: true,
        contentType: 'application/json; charset=UTF-8',
        url: "/api/book/",
        dataType: "json",
    }).done(
        function (allData) {
            for (var i = 0, len = allData.length; i< len; i++){
                self.books.push(new Book(allData[i]));
            }
        }
    ).fail(function errorFn(xhr, status, strErr) {
        console.log('There seems to be an Error in connection' + strErr);
    });
    // make an api cal to get books then pull the books out of the result 
    //of the api call and make them observables
    // $.getJSON("https://andela-resful.herokuapp.com/api/book", function (allData) {
    //     var mappedBooks = $.map(allData, function (item) { return new Book(item); });
    //     self.books(mappedBooks);
    // });
}
ko.applyBindings(new ViewModel());