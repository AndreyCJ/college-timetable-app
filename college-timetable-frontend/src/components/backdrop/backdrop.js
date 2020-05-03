import React from 'react';

import './backdrop.css';

const Backdrop = props => {
    const className = props.show ? 'backdrop open' : 'backdrop';

    return <div className={className} onClick={props.click}/>
};

export default Backdrop;