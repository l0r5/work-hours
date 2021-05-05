import {Fragment, useContext, useState} from 'react';

import classes from './Layout.module.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import Login from '../../pages/Login/Login';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import AuthContext from '../../store/auth-context';

const Layout = (props) => {
    const authCtx = useContext(AuthContext);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    if (authCtx.isLoggedIn) {
        return (
            <Fragment>
                <Toolbar
                    drawerToggleClicked={sideDrawerToggleHandler}
                    onLogout={authCtx.logout}/>
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerCloseHandler}/>
                <main className={classes.main}>{props.children}</main>
            </Fragment>
        );
    } else {
        return <Login/>;
    }
};

export default Layout;