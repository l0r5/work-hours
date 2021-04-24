import classes from './EditWorkHours.module.css';
import WorkHoursForm from '../../components/WorkHoursForm/WorkHoursForm';
import {useHistory, useLocation} from 'react-router-dom';

const EditWorkHours = () => {
    const history = useHistory();

    const location = useLocation();

    let initialValues = null;

    if (location.state) {
        initialValues = location.state;
    }

    const onSubmitHandler = async (element) => {
        console.log("Update element");
        console.log(element);
        if (element) {
            await fetch('https://workhours-e2280-default-rtdb.firebaseio.com/workhours/' + element.id + '.json', {
                method: 'PUT',
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
    };

    const onBackHandler = () => {
        history.goBack();
    };
    return (
        <div className={classes.NewWorkHours}>
            <WorkHoursForm
                type='edit'
                initalValues={initialValues}
                onSubmit={onSubmitHandler}
                onBack={onBackHandler}
            />
        </div>
    );
};

export default EditWorkHours;