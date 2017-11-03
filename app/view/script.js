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

    // make an api cal to get books then pull the books out of the result 
    //of the api call and make them observables
    $.getJSON("/api/book/", function (allData) {
        var mappedBooks = $.map(allData, function (item) { return new Book(item); });
        self.tasks(mappedBooks);
    });
}
ko.applyBindings(new ViewModel());