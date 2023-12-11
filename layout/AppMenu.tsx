/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'School',
            items: [
                { label: 'Add School', icon: 'pi pi-fw pi-id-card', to: '/app/school/add' },
                { label: 'View Schools', icon: 'pi pi-fw pi-check-square', to: '/app/input' }
            ]
        },
        {
            label: 'Grade',
            items: [
                { label: 'Add Grade', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'View Grades', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Subject',
            items: [
                { label: 'Add Subject', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'View Subjects', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },
        {
            label: 'Topic',
            items: [
                { label: 'Add Topic', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'View Topics', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },
        {
            label: 'Sub Topic',
            items: [
                { label: 'Add Sub Topic', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'View Sub Topics', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },

    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
