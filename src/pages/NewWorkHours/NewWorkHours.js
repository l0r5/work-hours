import WorkHoursInput from '../../components/WorkHoursInput/WorkHoursInput';

import classes from './NewWorkHours.module.css';

const NewWorkHours = () => {
    return (
        <div className={classes.NewWorkHours}>
            <WorkHoursInput/>
        </div>
    );
};

export default NewWorkHours;