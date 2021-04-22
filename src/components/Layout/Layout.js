import {Fragment} from 'react';

import classes from './Layout.module.css';
import MainNavigation from './MainNavigation/MainNavigation';
import Login from '../Login/Login';

const Layout = (props) => {
        return (
            <Fragment>
                {!props.isLoggedIn &&
                <Fragment>
                    <Login onLogin={props.onLogin}/>
                </Fragment>
                }
                {props.isLoggedIn &&
                <Fragment>
                    <MainNavigation onLogout={props.onLogout}/>
                    <main className={classes.main}>{props.children}</main>
                </Fragment>
                }
            </Fragment>
        );
    }
;

export default Layout;