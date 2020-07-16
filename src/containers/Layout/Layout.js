import React, { Fragment, Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: true
    };
    
    render() {
        return (
            <Fragment>
                <Toolbar />
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
    }

}

export default Layout;