import {NavLink} from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
    return (
        <header className="header">
            <div className="logo">WH</div>
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink to='/' activeClassName="active">
                            Übersicht
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/erfassen' activeClassName="active">
                            Erfassen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
