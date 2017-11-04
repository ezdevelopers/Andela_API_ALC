var Book = function (book) {
    this.id = ko.observable(book._id);
    this.name = ko.observable(book.name);
    this.isbn = ko.observable(book.isbn);
    this.author = ko.observable(book.author);
    this.description = ko.observable(book.description);
}

var ViewModel = function () {

    $(document).ajaxStart(function () {
        $(".preloader-wrapper").show()
        console.log("Ajax Request is Starting");
    });
    // Ajax stop global function
    $(document).ajaxStop(function () {
        $(".preloader-wrapper").hide()
        console.log("Ajax Request has ended");
    });

    var self = this;

    //apply bindings to the form input
    self.bookName = ko.observable();
    self.author = ko.observable();
    self.isbn = ko.observable();
    self.description = ko.observable();

    //store books fetched from the API
    self.books = ko.observableArray([]);

    //add book to database via API
    self.addBook = function () {
        if (!self.bookName() || !self.author() || !self.isbn() || !self.description()) {
            alert("All fields required");
        } else {
            //build an object to add to database via API
            var book = {
                "name": self.bookName(),
                "author": self.author(),
                "isbn": self.isbn(),
                "description": self.description()
            }
            $.ajax({
                type: "POST",
                crossOrigin: true,
                contentType: 'application/json; charset=UTF-8',
                url: "https://andela-resful.herokuapp.com/api/book/",
                data: JSON.stringify(book),
                processData: true,
                dataType: "json"
            }).done(
                self.books.unshift(new Book(book))
            ).fail(function errorFn(xhr, status, strErr) {
                alert('There seems to be an error in adding books')
                //console.log('There seems to be an error in adding books' + strErr);
            });
        }
    }
    //delete function 
    self.deleteBook = function (item) {
        var id = item.id();
        $.ajax({
            type: "DELETE",
            crossOrigin: true,
            contentType: 'application/json; charset=UTF-8',
            url: "https://andela-resful.herokuapp.com/api/book/" + id,
            dataType: "json",
        }).done(
            //console.log("deleted")
            self.books.remove(item)
        ).fail(function errorFn(xhr, status, strErr) {
            alert('There seems to be an error in deleting book')
            //console.log('There seems to be an error in retrieving books' + strErr);
        });

    }

    // //grab the clicked book for editing
    // self.grabBook = function(item){
    //     document.getElementById("editName").value = item.name();
    //     document.getElementById("editAuthor").value = item.author();
    //     document.getElementById("editIsbn").value = item.isbn();
    //     document.getElementById("editDescription").value = item.description();
    // }
    // //edit function
    // self.editBook = function (item) {
    //     var editBook = {
    //         "name": self.bookName(),
    //         "author": self.author(),
    //         "isbn": self.isbn(),
    //         "description": self.description()
    //     }
    //     console.log(item)

    // }
    
    // make an api call to get books then pull the books out of the result 
    //of the api call and make them observables to be displayed on the index page
    $.ajax({
        type: "GET",
        crossOrigin: true,
        contentType: 'application/json; charset=UTF-8',
        url: "https://andela-resful.herokuapp.com/api/book/",
        dataType: "json",
    }).done(
        function (allData) {
            for (var i = 0, len = allData.length; i < len; i++) {
                self.books.unshift(new Book(allData[i]));
            }
        }
    ).fail(function errorFn(xhr, status, strErr) {
        alert('There seems to be an error in retrieving books')
       // console.log('There seems to be an error in retrieving books' + strErr);
    });
}
ko.applyBindings(new ViewModel());