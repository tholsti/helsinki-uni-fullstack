import React from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, isVisible }) => {
    if (isVisible) {
        return <>{children}</>
    }

    return null;
};

Togglable.propTypes = {
    children: PropTypes.element.isRequired,
    isVisible: PropTypes.bool.isRequired,
}

export default Togglable;
