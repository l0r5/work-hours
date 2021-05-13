import classes from './NewWorkHours.module.css';
import WorkHoursForm from '../../components/Forms/WorkHoursForm/WorkHoursForm';
import {useHistory} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import {useState} from 'react';
import {FIREBASE_COLLECTION_BASE_URL} from '../../consts/consts';

const NewWorkHours = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const onSubmitAddNewHandler = (element) => {
        setIsLoading(true);
        fetch(FIREBASE_COLLECTION_BASE_URL + '/workhours.json', {
            method: 'POST',
            body: JSON.stringify({
                date: element.date,
                customer: element.customer,
                location: element.location,
                token: element.token,
                task: element.task,
                comment: element.comment,
                employee: element.employee,
                workHours: element.workHours,
                chainsawHours: element.chainsawHours,
                machineHours: element.machineHours
            })
        }).then(() => {
                setIsLoading(false);
                history.push('/');
                console.log("Added new element with id " + element.id);
            }
        );
    }

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    return (
        <div className={classes.NewWorkHours}>
            <h2>Neue Arbeitsstunden erfassen</h2>
            <WorkHoursForm
                type={'new'}
                onSubmit={onSubmitAddNewHandler}
            />
        </div>
    );
};

export default NewWorkHours;