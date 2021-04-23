import classes from './Toolbar.module.css';
import Button from '../../../UI/Button/Button';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <Button onClick={props.onLogout}>Logout</Button>
        </header>
    );
};

export default Toolbar;
