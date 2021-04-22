import classes from './Toolbar.module.css';
import Button from '../../../UI/Button/Button';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
            <Button onClick={props.onLogout}>Logout</Button>
        </header>
    );
};

export default Toolbar;
