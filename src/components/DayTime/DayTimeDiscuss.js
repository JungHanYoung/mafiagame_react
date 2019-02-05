import React from 'react';
import PropTypes from 'prop-types';

const DayTimeDiscuss = (props) => (
	<>
		<h2>낮 토론 시간입니다. 토론을 통해 마피아를 찾으세욥.</h2>
		<button onClick={props.changeDayTimeOrder}>투표로 이동</button>
	</>
)

DayTimeDiscuss.propTypes = {
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default DayTimeDiscuss
