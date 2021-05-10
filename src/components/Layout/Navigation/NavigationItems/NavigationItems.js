import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={"/"} exact>Übersicht</NavigationItem>
        <NavigationItem link={"/erfassen"}>Erfassen</NavigationItem>
        <NavigationItem link={"/profil"}>Profil</NavigationItem>
        <NavigationItem link={"/administration"}>Administration</NavigationItem>
    </ul>
);

export default NavigationItems;