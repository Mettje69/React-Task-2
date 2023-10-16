import React, { Component } from "react";

import gotService from "../../services/gotService";

import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock";

export default class HousePage extends Component {
	gotService = new gotService();

	state = {
		selectedHouse: 20,
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({ selectedHouse: id });
	};

	render() {
		const { selectedHouse, error } = this.state;
		if (error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllHouses()}
				renderItem={(item) => `${item.name} (${item.region})`}
			/>
		);

		const itemDetails = (
			<ItemDetails itemId={selectedHouse} getData={this.gotService.getHouse}>
				<Field field="region" label="Region" />
				<Field field="coatOfArms" label="Coat of arms" />
			</ItemDetails>
		);

		return <RowBlock left={itemList} right={itemDetails} />;
	}
}
