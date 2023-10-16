import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const ItemDetailsBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
`;

function ItemDetails({ itemId, getData, children }) {
	useEffect(() => {
		setLoaded(false);
		updateItem();
	}, [itemId]);
	const [item, setItem] = useState({});
	const [isError, setError] = useState(false);
	const [isLoaded, setLoaded] = useState(false);

	const onItemLoaded = () => {
		setError(false);
		setLoaded(true);
	};

	const onError = () => {
		setError(true);
		setLoaded(true);
	};

	const updateItem = () => {
		if (!itemId) {
			return;
		}
		getData(itemId)
			.then((item) => {
				setItem(item);
				onItemLoaded();
			})
			.catch(onError);
	};

	if (!item && isLoaded) {
		return (
			<ItemDetailsBlock className="rounded mb-3">
				<h4>Select an item from the list</h4>
			</ItemDetailsBlock>
		);
	}

	const errorMessage = isError ? <ErrorMessage /> : null;
	const spinner = !isLoaded ? <Spinner /> : null;
	const content = isLoaded && !isError ? <Content item={item} children={children} /> : null;
	return (
		<ItemDetailsBlock className="rounded mb-3">
			{errorMessage}
			{spinner}
			{content}
		</ItemDetailsBlock>
	);
}

const Content = ({ item, children }) => {
	const { name } = item;
	return (
		<>
			<h4>{name}</h4>
			<ul className="list-group list-group-flush">
				{React.Children.map(children, (child) => {
					return React.cloneElement(child, { item });
				})}
			</ul>
		</>
	);
};

const Field = ({ item, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export { Field };
export default ItemDetails;
