import React, { Component } from "react";

import gotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class BookItem extends Component {
	gotService = new gotService();

	render() {
		return (
			<ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
				<Field field="numberOfPages" label="Pages" />
				<Field field="publisher" label="Publisher" />
				<Field field="country" label="Country" />
			</ItemDetails>
		);
	}
}
