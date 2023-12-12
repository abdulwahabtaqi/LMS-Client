import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext, useAppContext } from './context/layoutcontext';
import LoadingBar from 'react-top-loading-bar';


const AppTopBar = forwardRef<AppTopbarRef>((props, ref) => {
    const {pageLoader} = useAppContext()
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menuButtonRef = useRef(null);
    const topBarMenuRef = useRef(null);
    const topBarMenuButtonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menuButtonRef.current,
        topbarmenu: topBarMenuRef.current,
        topbarmenubutton: topBarMenuButtonRef.current
    }));

    return (
        <div className="layout-topbar">
            <LoadingBar
                color="#0000FF"
                progress={pageLoader?.pageLoading}
                onLoaderFinished={() => pageLoader?.setPageLoading(0)}
            />
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>SAKAI</span>
            </Link>

            <button ref={menuButtonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topBarMenuButtonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topBarMenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopBar.displayName = 'AppTopBar';

export default AppTopBar;
