/* eslint-disable indent */
'use strict';

const select = {
	listOfBooks: '.books-list',
};

const templates = {
	bookTemplate: Handlebars.compile(
		document.querySelector('#template-book').innerHTML
	),
};

class BookList {
	constructor(data) {
		this.data = data;
		this.favoriteBooks = [];
		this.filters = [];

		this.getElements();
		this.renderBooks();
		this.initActions();
	}

	getElements() {
		this.booksWrapper = document.querySelector(select.listOfBooks);
		this.form = document.querySelector('.filters');
	}

	renderBooks() {
		this.setRatingStyle(this.data);
		this.data.forEach(book => {
			const generatedHTML = templates.bookTemplate(book);
			const generatedDOM = utils.createDOMFromHTML(generatedHTML);
			const booksMenu = document.querySelector(select.listOfBooks);
			booksMenu.appendChild(generatedDOM);
		});
	}

	setRatingStyle() {
		this.data.forEach(book => {
			book.width = 'width: ' + book.rating * 10 + '%';

			if (book.rating < 6) {
				book.color =
					'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
			} else if (book.rating > 6 && book.rating <= 8) {
				book.color =
					'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
			} else if (book.rating > 8 && book.rating <= 9) {
				book.color =
					'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
			} else {
				book.color =
					'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
			}
		});
	}

	initActions() {
		const booksWrapper = document.querySelector(select.listOfBooks);
		const form = document.querySelector('.filters');

		booksWrapper.addEventListener('dblclick', e => {
			const clickedBookRef = e.target.closest('.book__image');
			clickedBookRef.classList.toggle('favorite');
			const bookID = clickedBookRef.getAttribute(`data-id`);
			if (this.favoriteBooks.includes(bookID)) {
				const indexBookID = this.favoriteBooks.indexOf(bookID);
				this.favoriteBooks.splice(indexBookID, 1);
			} else {
				this.favoriteBooks.push(bookID);
			}
		});

		form.addEventListener('click', e => {
			const clickedInput = e.target.closest('input[name="filter"]');
			if (!clickedInput) return;
			if (clickedInput.checked) {
				this.filters.push(clickedInput.value);
			} else {
				const specIndex = this.filters.indexOf(clickedInput.value);
				this.filters.splice(specIndex, 1);
			}
			this.checkFilters(this.data);
		});
	}

	checkFilters(books) {
		for (let book of books) {
			let shouldBeHidden = false;
			for (let filter of this.filters) {
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
	}
}

const app = new BookList(dataSource.books);
