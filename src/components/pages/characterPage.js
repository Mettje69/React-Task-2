import React, { Component } from "react";

import gotService from "../../services/gotService";

import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {
	gotService = new gotService();

	state = {
		selectedChar: 20,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		const { selectedChar, error } = this.state;
		if (error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters()}
				renderItem={(item) => `${item.name} (${item.gender})`}
			/>
		);

		const itemDetails = (
			<ItemDetails 
			itemId={selectedChar} 
			getData={this.gotService.getCharacter}>
				<Field field="gender" label="Gender" />
				<Field field="born" label="Born" />
				<Field field="died" label="Died" />
				<Field field="culture" label="Culture" />
			</ItemDetails>
		);

		return <RowBlock left={itemList} right={itemDetails} />;
	}
}
