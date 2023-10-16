export default class GotService {
	constructor() {
		this._apiBase = "https://www.anapioficeandfire.com/api";
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}
		return await res.json();
	};

	getAllBooks = async () => {
		const res = await this.getResource(`/books/`);
		return res.map((item) => this._transformBook(item));
	};

	getBook = async (id) => {
		const res = await this.getResource(`/books/${id}`);
		return this._transformBook(res);
	};

	getAllCharacters = async () => {
		const res = await this.getResource(`/characters?page=2&pageSize=10`);
		return res.map((item) => this._transformCharacter(item));
	};

	getCharacter = async (id = 25) => {
		const res = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(res);
	};

	getAllHouses = async () => {
		const res = await this.getResource(`/houses?page=2&pageSize=10`);
		return res.map((item) => this._transformHouse(item));
	};

	getHouse = async (id) => {
		const res = await this.getResource(`/houses/${id}`);
		return this._transformHouse(res);
	};

	isKnown = (data) => {
		if (data) {
			return data;
		} else {
			return "Unknown";
		}
	};

	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	};

	_transformCharacter = (character) => {
		return {
			id: this._extractId(character),
			name: this.isKnown(character.name),
			gender: this.isKnown(character.gender),
			born: this.isKnown(character.born),
			died: this.isKnown(character.died),
			culture: this.isKnown(character.culture),
		};
	};

	_transformHouse = (house) => {
		return {
			id: this._extractId(house),
			name: this.isKnown(house.name),
			region: this.isKnown(house.region),
			words: this.isKnown(house.words),
			titles: this.isKnown(house.titles),
			coatOfArms: this.isKnown(house.coatOfArms),
			overlord: this.isKnown(house.overlord),
			ansectralWeapons: this.isKnown(house.ansectralWeapons),
		};
	};

	_transformBook = (book) => {
		return {
			id: this._extractId(book),
			name: this.isKnown(book.name),
			numberOfPages: this.isKnown(book.numberOfPages),
			publisher: this.isKnown(book.publisher),
			released: this.isKnown(book.released),
			country: this.isKnown(book.country),
		};
	};
}
