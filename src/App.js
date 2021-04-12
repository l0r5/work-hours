import Layout from './hoc/Layout/Layout';

import PastWorkHours from './containers/PastWorkHours/PastWorkHours';
import NewWorkHours from './containers/NewWorkHours/NewWorkHours';
import {Route, Switch} from 'react-router-dom';

function App() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path="/erfassen" component={NewWorkHours} />
                    <Route path="/" exact component={PastWorkHours}/>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
