import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={"/"} exact activeClassName={classes.active}>Übersicht</NavigationItem>
        <NavigationItem link={"/erfassen"} activeClassName={classes.active}>Erfassen</NavigationItem>
    </ul>
);

export default NavigationItems;