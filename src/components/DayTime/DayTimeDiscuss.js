import React from 'react';
import PropTypes from 'prop-types';

const DayTimeDiscuss = ({ changeDayTimeOrder }) => (
	<main className="daytime animated fadeInUp faster" data-testid="game-main">
		<h2 className="game-title" data-testid="game-title">hello mafia</h2>
		<div className="game-content" data-testid="game-content">
			<p className="content-description" data-testid="game-content-description">낮 토론 시간입니다.
				<br /> 토론을 통해<br /> 마피아를 찾으세요.</p>
		</div>
		<button
			data-testid="game-button"
			className="btn-lg"
			onClick={changeDayTimeOrder}>투표로 이동</button>

	</main>
)

DayTimeDiscuss.propTypes = {
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default DayTimeDiscuss
