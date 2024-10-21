/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext, useAppContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';
import { Role, User } from '../app/shared/types';
import { verifyToken } from '../app/shared/common';
import Loader from './../app/components/loader/Loader';

const AppMenu = () => {
    const g = useAppContext();
    const { layoutConfig } = useContext(LayoutContext);
    const [user, setUser] = useState({} as User);

    let model: AppMenuItem[] = [];
    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        console.log('userData', userData);
        setUser(userData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (user?.role === Role.ADMIN) {
        model = [
            {
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
            },
            {
                items: [{ label: 'School', icon: 'pi pi-fw pi-building', to: '/lms/admin/school/create' }]
            },
            {
                items: [{ label: 'Grade', icon: 'pi pi-fw pi-arrow-up-right', to: '/lms/admin/grade/create', badge: 'NEW' }]
            },
            {
                items: [{ label: 'Subject', icon: 'pi pi-fw pi-palette', to: '/lms/admin/subject/create' }]
            },
            {
                items: [{ label: 'Topic', icon: 'pi pi-fw pi-table', to: '/lms/admin/topic/create' }]
            },
            {
                items: [{ label: 'Sub Topic', icon: 'pi pi-fw pi-book', to: '/lms/admin/sub-topic/create' }]
            },
            {
                items: [{ label: 'Question', icon: 'pi pi-fw pi-question', to: '/lms/admin/question/create' }]
            },
            {
                items: [{ label: 'Answer', icon: 'pi pi-fw pi-eject', to: '/lms/admin/answer/create' }]
            },

            {
                items: [{ label: 'Import', icon: 'pi pi-file-import', to: '/lms/admin/answer/import' }]
            },
            {
                items: [{ label: 'Media', icon: 'pi pi-image', to: '/lms/admin/question/media' }]
            },
            {
                items: [
                    { label: 'Export', icon: 'pi pi-fw pi-home', to: '/lms/teacher/export' },
                    { label: 'History', icon: 'pi pi-clock', to: '/lms/history/' }
                ]
            },
            {
                items: [{ label: 'Users', icon: 'pi pi-users', to: '/lms/admin/users' }]
            }
        ] as AppMenuItem[];
    } else if (user?.role === Role.TEACHER) {
        model = [
            {
                items: [{ label: 'Export', icon: 'pi pi-fw pi-home', to: '/lms/teacher/export' }]
            },
            {
                items: [{ label: 'Assignments', icon: 'pi pi-fw pi-pencil', to: '/lms/teacher/assignment' }]
            }
        ] as AppMenuItem[];
    } else {
        model = [
            {
                items: [{ label: 'Export', icon: 'pi pi-fw pi-home', to: '/lms/teacher/export' }]
            },
            {
                items: [{ label: 'Connections', icon: 'pi pi-fw pi-users', to: '/lms/teacher/connection' }]
            },
            {
                items: [{ label: 'Assignments', icon: 'pi pi-fw pi-pencil', to: '/lms/student/assignments' }]
            }
        ] as AppMenuItem[];
    }
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model?.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
