import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const Toolbar = () => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;