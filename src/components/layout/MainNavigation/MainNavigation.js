import {NavLink} from 'react-router-dom';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink to='/' activeClassName={styles.active}>
                            Übersicht
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/erfassen' activeClassName={styles.active}>
                            Erfassen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
