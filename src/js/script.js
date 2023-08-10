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
const filters = [];

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
	const form = document.querySelector('.filters');

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

	form.addEventListener('click', e => {
		const clickedInput = e.target.closest('input[name="filter"]');
		if (clickedInput.checked) {
			filters.push(clickedInput.value);
		} else {
			const specIndex = filters.indexOf(clickedInput.value);
			filters.splice(specIndex, 1);
		}
		checkFilters(dataSource.books);
	});

	const checkFilters = function (books) {
		for (let book of books) {
			let shouldBeHidden = false;
			for (let filter of filters) {
				if (!book.details[filter]) {
					shouldBeHidden = true;
					break;
				}
			}
			if (shouldBeHidden) {
				document
					.querySelector(`.book__image[data-id='${book.id}'`)
					.classList.add('hidden');
			} else {
				document
					.querySelector(`.book__image[data-id='${book.id}'`)
					.classList.remove('hidden');
			}
		}
	};
};

initActions();
