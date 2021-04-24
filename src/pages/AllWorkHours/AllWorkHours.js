import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import classes from './AllWorkHours.module.css';
import AllWorkHoursList from '../../components/AllWorkHoursList/AllWorkHoursList';
import Spinner from '../../components/UI/Spinner/Spinner';

const AllWorkHours = () => {
    const [workHours, setWorkHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchWorkHours = async () => {
            const response = await fetch('https://workhours-e2280-default-rtdb.firebaseio.com/workhours.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
            const loadedWorkHours = [];
            for (const key in responseData) {
                loadedWorkHours.push({
                    id: key,
                    date: responseData[key].date,
                    customer: responseData[key].customer,
                    location: responseData[key].location,
                    token: responseData[key].token,
                    task: responseData[key].task,
                    comment: responseData[key].comment,
                    employee: responseData[key].employee,
                    workHours: responseData[key].workHours,
                    chainsawHours: responseData[key].chainsawHours,
                    machineHours: responseData[key].machineHours
                });
            }
            setWorkHours(loadedWorkHours);
            setIsLoading(false);
            console.log("Fetched Work Hours from Database.")
        };
        fetchWorkHours().catch(error => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    if (httpError) {
        return (
            <section className={classes.WorkHoursError}>
                <p>{httpError}</p>
            </section>);
    }

    return (
        <div className={classes.AllWorkHours}>
            <Link to='/erfassen'><Button>Erfassen</Button></Link>
            <AllWorkHoursList items={workHours}/>
        </div>
    );
};

export default AllWorkHours;