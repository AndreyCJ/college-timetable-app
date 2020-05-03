import React from 'react';

import './mobileMenuToggleBtn.css';

const MobileMenuToggleBtn = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
    </button>
);

export default MobileMenuToggleBtn;