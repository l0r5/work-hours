import {Fragment, useContext, useState} from 'react';

import classes from './Layout.module.css';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import Modal from '../UI/Modal/Modal';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import {ROLE_ADMIN} from '../../consts/consts';

const Layout = (props) => {
    const authCtx = useContext(AuthContext);

    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const logoutHandler = () => {
        setShowLogoutModal(false);
        authCtx.logout();
    }

    const toggleModalHandler = () => {
        setShowLogoutModal(!showLogoutModal);
    }

    console.log('isAdmin' + authCtx.role);
    console.log('isAdmin' + (authCtx.role === ROLE_ADMIN));


    return (props.isLoggedIn ?
            <Fragment>
                {showLogoutModal &&
                <Modal onClose={toggleModalHandler}>
                    <h1>Logout</h1>
                    <p>Wirklich ausloggen?</p>
                    <Button onClick={logoutHandler}>Logout</Button>
                </Modal>}
                <Toolbar
                    drawerToggleClicked={sideDrawerToggleHandler}
                    onLogout={toggleModalHandler}
                    isAdmin={(authCtx.role === ROLE_ADMIN)}
                />
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerCloseHandler}
                    isAdmin={(authCtx.role === ROLE_ADMIN)}
                />
                <main className={classes.main}>{props.children}</main>
            </Fragment>
            :
            <Fragment>
                <main>{props.children}</main>
            </Fragment>
    )
};

export default Layout;