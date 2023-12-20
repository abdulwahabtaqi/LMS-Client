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
                { label: 'School', icon: 'pi pi-fw pi-building', to: '/lms/school/create' },
            ]
        },
        {
            label: 'Grade',
            items: [
                { label: 'Grade', icon: 'pi pi-fw pi-arrow-up-right', to: '/lms/grade/create', badge: 'NEW' },
            ]
        },
        {
            label: 'Subject',
            items: [
                { label: 'Subject', icon: 'pi pi-fw pi-palette', to: '/lms/subject/create' },
            ]
        },
        {
            label: 'Topic',
            items: [
                { label: 'Topic', icon: 'pi pi-fw pi-table', to: '/lms/topic/create' },
            ]
        },
        {
            label: 'Sub Topic',
            items: [
                { label: 'Sub Topic', icon: 'pi pi-fw pi-book', to: '/lms/sub-topic/create' },
            ]
        },
        {
            label: 'Question',
            items: [
                { label: 'Question', icon: 'pi pi-fw pi-question', to: '/lms/question/create' },
            ]
        },
        {
            label: 'Answer',
            items: [
                { label: 'Answer', icon: 'pi pi-fw pi-eject', to: '/lms/answer/create' },
            ]
        },
        {
            label: 'Imports',
            items: [
                { label: 'Import', icon: 'pi pi-file-import', to: '/lms/answer/import' },
            ]
        },

    ];

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
