import {Link} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import classes from './AllWorkHours.module.css';
import AllWorkHoursList from '../../components/AllWorkHoursList/AllWorkHoursList';

const AllWorkHours = () => {


    const DUMMY_DATA = [
        {   id: 1,
            date: new Date(2021, 5, 12),
            customer: 'Kunde 1',
            location: 'Nellingen',
            token: 'TA',
            task: 'Aufgabe1',
            comment: 'Kommentar',
            employee: 'Tino Allgöwer',
            workHours: 7,
            chainsawHours: 2,
            machineHours: 3,
        },
        {   id: 2,
            date: new Date(2021, 5, 12),
            customer: 'Kunde 2',
            location: 'Nellingen',
            token: 'TA',
            task: 'Aufgabe2',
            comment: 'Kommentar',
            employee: 'Tino Allgöwer',
            workHours: 2,
            chainsawHours: 2,
            machineHours: 3,
        },
        {   id: 3,
            date: new Date(2021, 5, 12),
            customer: 'Kunde 1',
            location: 'Nellingen',
            token: 'TA',
            task: 'Aufgabe3',
            comment: 'Kommentar',
            employee: 'Tino Allgöwer',
            workHours: 5,
            chainsawHours: 2,
            machineHours: 3,
        }
    ];


    return (
        <div className={classes.AllWorkHours}>
            <Link to='/erfassen'><Button>Erfassen</Button></Link>
            <AllWorkHoursList items={DUMMY_DATA}/>
        </div>
    );
};

export default AllWorkHours;