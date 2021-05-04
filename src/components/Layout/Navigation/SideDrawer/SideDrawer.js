import {Fragment} from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import ReactDOM from 'react-dom';

const portalElement = document.getElementById('overlays');

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop show={props.open}
                                             onClose={props.closed}/>, portalElement)}
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;