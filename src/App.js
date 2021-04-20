import {Route, Switch} from 'react-router-dom';
import NotFound from './pages/NotFound';
import AllWorkHours from './pages/AllWorkHours';
import NewWorkHours from './pages/NewWorkHours';
import Layout from './components/layout/Layout';

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
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;