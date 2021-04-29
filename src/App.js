import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AllWorkHours from './pages/AllWorkHours/AllWorkHours';
import NewWorkHours from './pages/NewWorkHours/NewWorkHours';
import NotFound from './pages/NotFound/NotFound';
import EditWorkHours from './pages/EditWorkHours/EditWorkHours';
import AuthContext from './store/auth-context';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // check email and password
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler,
            }}>
            <Layout>
                <Switch>
                    <Route path='/' exact>
                        <AllWorkHours/>
                    </Route>
                    <Route path='/erfassen' exact>
                        <NewWorkHours/>
                    </Route>
                    <Route path='/bearbeiten/:id' exact>
                        <EditWorkHours/>
                    </Route>
                    <Route path='*'>
                        <NotFound/>
                    </Route>
                </Switch>
            </Layout>
        </AuthContext.Provider>
    );
}

export default App;