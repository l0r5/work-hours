import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAdmin={props.isAdmin}/>
            </nav>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <span onClick={props.onLogout} className={classes.Logout}>Logout</span>
        </header>
    );
};

export default Toolbar;
