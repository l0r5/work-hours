import {NavLink} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import Button from '../../UI/Button/Button';

const MainNavigation = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>WH</div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/' activeClassName={classes.active}>
                            Übersicht
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/erfassen' activeClassName={classes.active}>
                            Erfassen
                        </NavLink>
                    </li>
                </ul>
                <Button onClick={props.onLogout}>Logout</Button>
            </nav>
        </header>
    );
};

export default MainNavigation;
