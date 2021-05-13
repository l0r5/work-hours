import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={"/"} exact>Übersicht</NavigationItem>
            <NavigationItem link={"/erfassen"}>Erfassen</NavigationItem>
            <NavigationItem link={"/profil"}>Profil</NavigationItem>
            {props.isAdmin &&
            <NavigationItem link={"/administration"}>Administration</NavigationItem>}
        </ul>
    );
};

export default NavigationItems;