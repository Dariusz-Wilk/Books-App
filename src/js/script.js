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
		const generatedHTML = templates.bookTemplate(book);
		const generatedDOM = utils.createDOMFromHTML(generatedHTML);
		const booksMenu = document.querySelector(select.listOfBooks);
		booksMenu.appendChild(generatedDOM);
	});
};

renderBooks(dataSource.books);

const initActions = function () {
	const booksWrapper = document.querySelector(select.listOfBooks);
	booksWrapper.addEventListener('dblclick', e => {
		const clickedBookRef = e.target.closest('.book__image');
		clickedBookRef.classList.toggle('favorite');
		const bookID = clickedBookRef.getAttribute(`data-id`);
		if (favoriteBooks.includes(bookID)) {
			const indexBookID = favoriteBooks.indexOf(bookID);
			favoriteBooks.splice(indexBookID, 1);
		} else {
			favoriteBooks.push(bookID);
		}
	});
};

initActions();
