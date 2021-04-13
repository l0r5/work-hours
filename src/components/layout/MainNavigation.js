import {NavLink} from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>LOGO</div>
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
            </nav>
        </header>
    );
};

export default MainNavigation;
