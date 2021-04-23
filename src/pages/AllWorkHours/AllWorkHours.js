import {Link} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import classes from './AllWorkHours.module.css';
import AllWorkHoursList from '../../components/AllWorkHoursList/AllWorkHoursList';

const AllWorkHours = () => {


    const DUMMY_EXPENSES = [
        {
            id: 'e1',
            title: 'Toilet Paper',
            amount: 94.12,
            date: new Date(2020, 7, 14),
        },
        { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
        {
            id: 'e3',
            title: 'Car Insurance',
            amount: 294.67,
            date: new Date(2021, 2, 28),
        },
        {
            id: 'e4',
            title: 'New Desk (Wooden)',
            amount: 450,
            date: new Date(2021, 5, 12),
        },
    ];


    return (
        <div className={classes.AllWorkHours}>
            <Link to='/erfassen'><Button>Erfassen</Button></Link>
            <AllWorkHoursList items={DUMMY_EXPENSES}/>
        </div>
    );
};

export default AllWorkHours;