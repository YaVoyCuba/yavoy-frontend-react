import React from 'react';

import HeaderTop from './HeaderTop';
import Location from './Location';

const Header = ( props ) => {
    const locationType = props.locationType;

    return (
        <div className="header-fixed-top bg-white py-3">
            <HeaderTop />
            <Location />
        </div>
    );
};

export default Header;
