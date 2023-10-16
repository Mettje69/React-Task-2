import React, { useState, useEffect } from "react";
import "./itemList.css";
import Spinner from "../spinner";

function ItemList({ getData, onItemSelected, renderItem }) {
	const [itemList, updateList] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const ac = new AbortController();
		getData.then((data) => {
			updateList(data);
			setIsLoaded(true);
		});
		return () => ac.abort();
	}, [getData]);

	function renderItems(arr) {
		return arr.map((item) => {
			const { id } = item;
			const label = renderItem(item);
			return (
				<li key={id} className="list-group-item" onClick={() => onItemSelected(id)}>
					{label}
				</li>
			);
		});
	}

	if (!isLoaded) {
		return <Spinner />;
	}
	const items = renderItems(itemList);
	return <ul className="item-list list-group mb-3">{items}</ul>;
}

export default ItemList;
