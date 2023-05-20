import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NavigationComponent } from './layout/Navigation';

import { FooterComponent } from './layout/Footer';
import { MenuTab } from './layout/MenuTab';
import { CookieStorageUtil } from '@/shared/utils';

export const Layout = (props: any) => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(CookieStorageUtil.isAuthenticated())
    }, [])
    return <section className='layout'>
        <Head><title>Example</title></Head>
        <NavigationComponent />
        <main className='main-container'>{props.children}</main>
        {authenticated ? <MenuTab /> : <FooterComponent />}
    </section>
}