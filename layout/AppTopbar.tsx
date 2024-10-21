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
import Notification from './../app/components/notification/notification';
import getUser from '../app/context/server/users/getUser';
import getPendingConnections from '../app/context/server/connection/getPendingConnections';
import Image from 'next/image';

const AppTopBar = forwardRef<AppTopbarRef>((props, ref) => {
    const [user, setUser] = useState({} as User);
    const [userDet, setUserDet] = useState({} as any);
    const [pendingRequests, setPendingRequests] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const menuRef = useRef<TieredMenu>(null);
    const overlayPanelRef = useRef<OverlayPanel>(null);
    const router = useRouter();

    let userDetail;

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
        const fetchUser = async () => {
            userDetail = await getUser(userData?.id);
            if (userDetail?.result?.data) {
                setUserDet(userDetail?.result?.data);
            }
        };
        fetchUser();
    }, []);

    const { pageLoader } = useAppContext();
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menuButtonRef = useRef(null);
    const topBarMenuRef = useRef(null);
    const topBarMenuButtonRef = useRef(null);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            if (user?.id) {
                const result = await getPendingConnections(user.id);
                setPendingRequests(result.result.data || []);
            }
        };

        if (user?.id) {
            fetchPendingRequests();
        }
    }, [user]);

    useImperativeHandle(ref, () => ({
        menubutton: menuButtonRef.current,
        topbarmenu: topBarMenuRef.current,
        topbarmenubutton: topBarMenuButtonRef.current
    }));

    const items = [
        { label: 'History', icon: 'pi pi-users', command: () => router.push('/lms/history') },
        { label: 'Profile', icon: 'pi pi-user', command: () => router.push('/lms/profile') },
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
                <img src={`/layout/images/logo.png`} alt="profile image" />
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

            <div style={{ marginLeft: '20px', position: 'relative' }} className="notification-container">
                <p onClick={showNotifications} style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="pi pi-bell" style={{ fontSize: '1.5em' }} />
                    {pendingRequests.length > 0 && (
                        <Badge
                            value={pendingRequests.length}
                            severity="danger"
                            style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-10px',
                                zIndex: 1
                            }}
                        />
                    )}
                </p>
                <OverlayPanel ref={overlayPanelRef} dismissable>
                    <Notification />
                </OverlayPanel>
            </div>

            <div style={{ marginLeft: '20px' }} className="user-menu-container" onMouseEnter={(e) => menuRef.current?.toggle(e)}>
                <Tooltip target=".user-image-icon" position="top" />
                <div className="p-link layout-topbar-button">
                    <Image src={userDet?.profileImage || '/images/user.png'} alt="user-icon" width={30} height={30} className="user-image-icon" style={{ borderRadius: '50%' }} />
                </div>
                <TieredMenu model={items} popup ref={menuRef} />
            </div>
        </div>
    );
});

AppTopBar.displayName = 'AppTopBar';

export default AppTopBar;
