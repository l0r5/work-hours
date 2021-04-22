import {Fragment} from 'react';
import {Link} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import classes from './AllWorkHours.module.css';

const AllWorkHours = () => {
    return (
        <div className={classes.AllWorkHours}>
            <Link to='/erfassen'><Button>Erfassen</Button></Link>
            <p>All Work Hours</p>
        </div>
    );
};

export default AllWorkHours;