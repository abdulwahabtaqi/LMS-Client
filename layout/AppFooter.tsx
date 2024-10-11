/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo.png`} alt="Logo" height="20" className="mr-2" />
            by
            <a href="http://rowerr.com/" target="_blank" className="font-medium ml-2">
                rowerr.com
            </a>
        </div>
    );
};

export default AppFooter;
