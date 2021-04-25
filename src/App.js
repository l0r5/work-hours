import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AllWorkHours from './pages/AllWorkHours/AllWorkHours';
import NewWorkHours from './pages/NewWorkHours/NewWorkHours';
import NotFound from './pages/NotFound/NotFound';
import EditWorkHours from './pages/EditWorkHours/EditWorkHours';

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
        <Layout
            isLoggedIn={isLoggedIn}
            onLogin={loginHandler}
            onLogout={logoutHandler}>
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
    );
}

export default App;