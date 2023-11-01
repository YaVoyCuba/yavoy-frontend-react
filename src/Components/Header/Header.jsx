import React from 'react';

import HeaderTop from './HeaderTop';
import Location from './Location';

const Header = ( props ) => {
    const locationType = props.locationType;

    return (
        <div>
            <HeaderTop />
            <Location />
        </div>
    );
};

export default Header;
