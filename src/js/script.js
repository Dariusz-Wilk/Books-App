/* eslint-disable indent */
const select = {
	listOfBooks: '.books-list',
};

const templates = {
	bookTemplate: Handlebars.compile(
		document.querySelector('#template-book').innerHTML
	),
};

const favoriteBooks = [];

const renderBooks = function (booksData) {
	booksData.forEach(book => {
		console.log(book);
		const generatedHTML = templates.bookTemplate(book);
		const generatedDOM = utils.createDOMFromHTML(generatedHTML);
		const booksMenu = document.querySelector(select.listOfBooks);
		booksMenu.appendChild(generatedDOM);
	});
};

renderBooks(dataSource.books);

const initActions = function () {
	const allBooks = document.querySelectorAll('.book__image');
	console.log(allBooks);
	for (let book of allBooks) {
		book.addEventListener('dblclick', () => {
			book.classList.toggle('favorite');
			const bookID = book.getAttribute(`data-id`);
			if (favoriteBooks.includes(bookID)) {
				const indexBookID = favoriteBooks.indexOf(bookID);
				favoriteBooks.splice(indexBookID, 1);
			} else {
				favoriteBooks.push(bookID);
			}
			console.log(favoriteBooks);
		});
	}
};

initActions();
