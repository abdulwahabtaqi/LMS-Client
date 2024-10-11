import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext, useAppContext } from './context/layoutcontext';
import LoadingBar from 'react-top-loading-bar';
import { verifyToken } from '../app/shared/common';
import { User } from '../app/shared/types';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'primereact/tooltip';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Badge } from 'primereact/badge';

const AppTopBar = forwardRef<AppTopbarRef>((props, ref) => {
    const [user, setUser] = useState({} as User);
    const [notifications, setNotifications] = useState([]); // State for notifications
    const menuRef = useRef<TieredMenu>(null);
    const overlayPanelRef = useRef<OverlayPanel>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
    }, []);

    const { pageLoader } = useAppContext();
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menuButtonRef = useRef(null);
    const topBarMenuRef = useRef(null);
    const topBarMenuButtonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menuButtonRef.current,
        topbarmenu: topBarMenuRef.current,
        topbarmenubutton: topBarMenuButtonRef.current
    }));

    const items = [
        { label: 'History', icon: 'pi pi-users', command: () => router.push('/lms/history') },
        { label: 'Profile', icon: 'pi pi-user', command: () => router.push('/profile') },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                localStorage.removeItem('lms-token');
                router.push('/auth/login');
            }
        }
    ];

    const showNotifications = (event: React.MouseEvent) => {
        overlayPanelRef.current?.toggle(event);
    };

    return (
        <div className="layout-topbar">
            <LoadingBar color="#0000FF" progress={pageLoader?.pageLoading} onLoaderFinished={() => pageLoader?.setPageLoading(0)} />
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo.png`} alt="logo" />
            </Link>

            <button ref={menuButtonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topBarMenuButtonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topBarMenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Link href="/lms/history">
                    <button type="button" className="p-link p-5 layout-topbar-button">
                        {user?.name}
                    </button>
                </Link>
            </div>

            <div style={{ marginLeft: '20px' }} className="notification-container">
                <p className=" " onClick={showNotifications}>
                    <i className="pi pi-bell" style={{ fontSize: '1.5em' }} />
                    {notifications.length > 0 && <Badge value={notifications.length} severity="danger" style={{ position: 'absolute', top: '0', right: '0' }} />}
                </p>
                <OverlayPanel ref={overlayPanelRef} dismissable>
                    <div style={{ padding: '1em' }}>{notifications.length === 0 ? <p>No notifications</p> : notifications.map((notification, index) => <p key={index}>{notification}</p>)}</div>
                </OverlayPanel>
            </div>

            <div style={{ marginLeft: '20px' }} className="user-menu-container" onMouseEnter={(e) => menuRef.current?.toggle(e)}>
                <Tooltip target=".user-image-icon" position="top" />
                <Button className="p-link layout-topbar-button">
                    <img src={user?.image || '/images/user.png'} alt="user-icon" className="user-image-icon" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                </Button>
                <TieredMenu model={items} popup ref={menuRef} />
            </div>
        </div>
    );
});

AppTopBar.displayName = 'AppTopBar';

export default AppTopBar;
