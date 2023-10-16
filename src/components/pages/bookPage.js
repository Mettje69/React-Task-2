import React, { Component } from "react";

import gotService from "../../services/gotService";

import ItemList from "../itemList";
import ErrorMessage from "../errorMessage";
import { withRouter } from "react-router";

class BookPage extends Component {
	gotService = new gotService();

	state = {
		error: false,
	};

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		const { error } = this.state;
		if (error) {
			return <ErrorMessage />;
		}

		return (
			<ItemList
				onItemSelected={(itemId) => {
					this.props.history.push(itemId);
				}}
				getData={this.gotService.getAllBooks()}
				renderItem={(item) => `${item.name} (${item.numberOfPages})`}
			/>
		);
	}
}

export default withRouter(BookPage);
