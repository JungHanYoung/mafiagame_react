import React from 'react';
// import PropTypes from 'prop-types';

const DayTimeDiscuss = (props) => (
	<>
		<div className="game-content">
			<h2>낮 토론 시간입니다.
				<br /> 토론을 통해 마피아를 찾으세요.</h2>
		</div>
		<button
			className="btn-lg"
			onClick={props.changeDayTimeOrder}>투표로 이동</button>
	</>
)

DayTimeDiscuss.propTypes = {
};

export default DayTimeDiscuss
