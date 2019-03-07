import React from 'react';
import PropTypes from 'prop-types'

export default function Layout({ children, describe }) {

    return (
        <div className="game-content">
            <p className="night-subject">{describe}</p>
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    describe: PropTypes.string.isRequired
}