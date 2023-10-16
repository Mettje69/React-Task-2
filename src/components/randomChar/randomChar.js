import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomCharBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
`;

function RandomChar({ interval, getData }) {
	useEffect(() => {
		updateChar();
		let randCharInterval = setInterval(updateChar, interval);
		return () => {
			clearInterval(randCharInterval);
		};
	}, []);

	const [char, setChar] = useState({});
	const [isLoaded, setLoaded] = useState(false);
	const [isError, setError] = useState(false);

	const onCharLoaded = (char) => {
		setChar(char);
		setLoaded(true);
	};

	const onError = (err) => {
		setError(true);
		setLoaded(true);
	};

	const updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		getData(id)
			.then(onCharLoaded)
			.catch(onError);
	};

	const errorMessage = isError ? <ErrorMessage /> : null;
	const spinner = !isLoaded ? <Spinner /> : null;
	const content = isLoaded && !isError ? <Content char={char} /> : null;
	return (
		<RandomCharBlock className="rounded mb-3">
			{errorMessage}
			{spinner}
			{content}
		</RandomCharBlock>
	);
}

const Content = ({ char }) => {
	const { name, gender, born, died, culture } = char;
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};

export default RandomChar;
