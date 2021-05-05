import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AllWorkHours from './pages/AllWorkHours/AllWorkHours';
import NewWorkHours from './pages/NewWorkHours/NewWorkHours';
import NotFound from './pages/NotFound/NotFound';
import EditWorkHours from './pages/EditWorkHours/EditWorkHours';
import RegisterUser from './pages/RegisterUser/RegisterUser';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
    return (
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
                    <Route path='/registrieren' exact>
                        <RegisterUser/>
                    </Route>
                    <Route path='/profil' exact>
                        <UserProfile/>
                    </Route>
                    <Route path='*'>
                        <NotFound/>
                    </Route>
                </Switch>
            </Layout>
    );
}

export default App;