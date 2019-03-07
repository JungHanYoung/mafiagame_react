import React from 'react'
import PropTypes from 'prop-types'

import minusImg from '../../../assets/btn-minus.png'
import plusImg from '../../../assets/btn-plus.png'

const CountInput = ({ count, handler }) => (
    <div className="input-container">
        <span
            className="btn minus"
            onClick={() => handler(count - 1)}>
            <img src={minusImg} alt="button" />
        </span>

        <span className="peopleNum">{count}</span>
        <span
            className="btn plus"
            onClick={() => handler(count + 1)}>
            <img src={plusImg} alt="button" />
        </span>
    </div>
)

CountInput.propTypes = {
    count: PropTypes.number.isRequired,
    handler: PropTypes.func.isRequired
}

export default CountInput