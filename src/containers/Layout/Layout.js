import React, { Fragment, Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };
    
    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                    isOpened={this.state.showSideDrawer} 
                    closed={this.closeSideDrawerHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    // Guarantee thread-safety
    toggleSideDrawerHandler = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer } 
        });
    };

}

export default Layout;