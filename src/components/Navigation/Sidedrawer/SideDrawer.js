import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
    const backdropStyles = [styles.SideDrawer];
    if (props.isOpened) {
        backdropStyles.push(styles.Open);
    }
    else {
        backdropStyles.push(styles.Close);
    }
    return (
        <Fragment>
            <Backdrop show={props.isOpened} clicked={props.closed}/>
            <div className={backdropStyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;