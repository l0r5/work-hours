import classes from './NewWorkHours.module.css';
import WorkHoursForm from '../../components/WorkHoursForm/WorkHoursForm';
import {useHistory} from 'react-router-dom';

const NewWorkHours = () => {

    const history = useHistory();

    const onSubmitAddNewHandler = (element) => {
        fetch('https://workhours-e2280-default-rtdb.firebaseio.com/workhours.json', {
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
                history.push('/');
            }
        );
    }

    return (
        <div className={classes.NewWorkHours}>
            <WorkHoursForm
                type={'new'}
                onSubmit={onSubmitAddNewHandler}
            />
        </div>
    );
};

export default NewWorkHours;