import React from 'react';

import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const Toolbar = () => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <ul>
                <li>1</li>
            </ul>
        </nav>
    </header>
);

export default Toolbar;