import {Fragment, useContext, useState} from 'react';

import classes from './Layout.module.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import Login from '../Login/Login';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import AuthContext from '../../store/auth-context';

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const ctx = useContext(AuthContext);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    if (ctx.isLoggedIn) {
        return (
            <Fragment>
                <Toolbar
                    drawerToggleClicked={sideDrawerToggleHandler}
                    onLogout={ctx.onLogout}/>
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerCloseHandler}/>
                <main className={classes.main}>{props.children}</main>
            </Fragment>
        );
    } else {
        return <Login onLogin={ctx.onLogin}/>;
    }
};

export default Layout;