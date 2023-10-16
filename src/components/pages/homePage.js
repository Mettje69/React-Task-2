import React, { Component } from "react";
import styled from "styled-components";
import RandomCharBlock from "./randomCharBlock";

const HomePageBlock = styled.div`
	color: #fff;
`;

export default class HomePage extends Component {
	render() {
		return (
			<>
				<HomePageBlock className="d-flex flex-row align-items-center my-4 pt-4">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-12 text-center">
								<span className="display-1 d-block">Game of Thrones DB</span>
								<div className="mb-2 lead"></div>
								<div className="mb-3 lead"></div>
							</div>
						</div>
					</div>
				</HomePageBlock>
				<RandomCharBlock />
			</>
		);
	}
}
