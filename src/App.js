import {Redirect, Route, Switch} from 'react-router-dom';
import {useContext} from 'react';

import Layout from './components/Layout/Layout';
import AllWorkHours from './pages/AllWorkHours/AllWorkHours';
import NewWorkHours from './pages/NewWorkHours/NewWorkHours';
import NotFound from './pages/NotFound/NotFound';
import EditWorkHours from './pages/EditWorkHours/EditWorkHours';
import Administration from './pages/RegisterUser/Administration';
import UserProfile from './pages/UserProfile/UserProfile';
import AuthContext from './store/auth-context';
import Login from './pages/Login/Login';

function App() {

    const authCtx = useContext(AuthContext);
    console.log(authCtx)


    const noAuthZone = (
        <Switch>
            <Route path='/' exact>
                <Redirect to='/login'/>
            </Route>
            <Route path='/login' exact>
                <Login/>
            </Route>
            <Route path='*'>
                <Redirect to='/login'/>
            </Route>
        </Switch>
    );

    const authRequiredZone = (
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
            <Route path='/administration' exact>
                <Administration/>
            </Route>
            <Route path='/profil' exact>
                <UserProfile/>
            </Route>
            <Route path='/login' exact>
                <Redirect to='/'/>
            </Route>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    );



    return (
        <Layout isLoggedIn={authCtx.isLoggedIn}>
            {authCtx.isLoggedIn ? authRequiredZone : noAuthZone}
        </Layout>
    );
}

export default App;