import React from 'react';

import styles from './Logo.module.css';
import logo from '../../assets/images/logo.svg';

const Logo = () => (
    <div className={styles.Logo}>
        <img src={logo} alt="Logo"/>
    </div>
);

export default Logo;