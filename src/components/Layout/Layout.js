import {Fragment, useState} from 'react';

import classes from './Layout.module.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (props.isLoggedIn ?
            <Fragment>
                <Toolbar
                    drawerToggleClicked={sideDrawerToggleHandler}
                    onLogout={props.onLogout}/>
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerCloseHandler}/>
                <main className={classes.main}>{props.children}</main>
            </Fragment>
            :
            <Fragment>
                <main>{props.children}</main>
            </Fragment>
    )
};

export default Layout;