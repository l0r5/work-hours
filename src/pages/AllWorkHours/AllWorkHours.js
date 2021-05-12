import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import classes from './AllWorkHours.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import WorkHoursTable from '../../components/Tables/WorkHoursTable/WorkHoursTable';
import WorkHoursDetailView from '../../components/WorkHoursDetailView/WorkHoursDetailView';

const AllWorkHours = () => {
    const history = useHistory();
    const [workHours, setWorkHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [detailViewIsShown, setDetailViewIsShown] = useState(false);
    const [detailViewItem, setDetailViewItem] = useState();

    useEffect(() => {
        fetchWorkHours().catch(error => {
            setIsLoading(false);
            setHttpError(error.message)
            throw error;
        });
    }, []);

    const fetchWorkHours = async () => {
        setIsLoading(true);
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

    const showDetailViewHandler = (item) => {
        setDetailViewItem(item);
        setDetailViewIsShown(true);
    };

    const hideDetailViewHandler = () => {
        setDetailViewItem({});
        setDetailViewIsShown(false);
    };

    const deleteItemRequestHandler = async (id) => {
        const response = await fetch('https://workhours-e2280-default-rtdb.firebaseio.com/workhours/' + id + '.json', {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        await console.log("Deleted element with id: " + id);
        await fetchWorkHours();
    };

    const onEditItemHandler = (item) => {
        console.log("Clicked item: ", item.id)
        history.push({
            pathname: `/bearbeiten/${item.id}`,
            state: {
                id: item.id,
                date: item.date,
                customer: item.customer,
                location: item.location,
                token: item.token,
                task: item.task,
                comment: item.comment,
                employee: item.employee,
                workHours: item.workHours,
                chainsawHours: item.chainsawHours,
                machineHours: item.machineHours
            }
        });
    };

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
            {detailViewIsShown &&
            <WorkHoursDetailView item={detailViewItem} onClose={hideDetailViewHandler}
                                 onEditClick={onEditItemHandler}
                                 onBackClick={hideDetailViewHandler}/>}
            <WorkHoursTable items={workHours} deleteRequestHandler={deleteItemRequestHandler}
                            onEditItemClick={onEditItemHandler}
                            onDetailViewClick={showDetailViewHandler}
            />
        </div>
    );
};

export default AllWorkHours;