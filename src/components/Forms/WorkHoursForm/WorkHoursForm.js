import classes from './WorkHoursForm.module.css';
import useInput from '../../../hooks/use-input';
import Button from '../../UI/Button/Button';
import TextButton from '../../UI/TextButton/TextButton';

const isNotEmpty = value => value.trim() !== '';

const WorkHoursForm = (props) => {

    const initialId = props.initalValues ? props.initalValues.id : null;
    const initialDate = props.initalValues ? props.initalValues.date : null;
    const initialCustomer = props.initalValues ? props.initalValues.customer : null;
    const initialLocation = props.initalValues ? props.initalValues.location : null;
    const initialComment = props.initalValues ? props.initalValues.comment : null;
    const initialToken = props.initalValues ? props.initalValues.token : null;
    const initialTask = props.initalValues ? props.initalValues.task : null;
    const initialEmployee = props.initalValues ? props.initalValues.employee : null;
    const initialWorkHours = props.initalValues ? props.initalValues.workHours : null;
    const initialChainsawHours = props.initalValues ? props.initalValues.chainsawHours : null;
    const initialMachineHours = props.initalValues ? props.initalValues.machineHours : null;

    const {
        value: enteredDate,
        isValid: enteredDateIsValid,
        hasError: dateInputHasError,
        valueChangedHandler: dateChangedHandler,
        inputBlurHandler: dateBlurHandler,
    } = useInput(initialDate, isNotEmpty);

    const {
        value: enteredCustomer,
        isValid: enteredCustomerIsValid,
        hasError: customerInputHasError,
        valueChangedHandler: customerChangedHandler,
        inputBlurHandler: customerBlurHandler,
    } = useInput(initialCustomer, isNotEmpty);

    const {
        value: enteredLocation,
        isValid: enteredLocationIsValid,
        hasError: locationInputHasError,
        valueChangedHandler: locationChangedHandler,
        inputBlurHandler: locationBlurHandler,
    } = useInput(initialLocation, isNotEmpty);

    const {
        value: enteredComment,
        isValid: enteredCommentIsValid,
        hasError: commentInputHasError,
        valueChangedHandler: commentChangedHandler,
        inputBlurHandler: commentBlurHandler,
    } = useInput(initialComment, () => true);

    const {
        value: enteredToken,
        isValid: enteredTokenIsValid,
        hasError: tokenInputHasError,
        valueChangedHandler: tokenChangedHandler,
        inputBlurHandler: tokenBlurHandler,
    } = useInput(initialToken, isNotEmpty);

    const {
        value: enteredTask,
        isValid: enteredTaskIsValid,
        hasError: taskInputHasError,
        valueChangedHandler: taskChangedHandler,
        inputBlurHandler: taskBlurHandler,
    } = useInput(initialTask, isNotEmpty);

    const {
        value: enteredEmployee,
        isValid: enteredEmployeeIsValid,
        hasError: employeeInputHasError,
        valueChangedHandler: employeeChangedHandler,
        inputBlurHandler: employeeBlurHandler,
    } = useInput(initialEmployee, isNotEmpty);

    const {
        value: enteredWorkHours,
        isValid: enteredWorkHoursIsValid,
        hasError: workHoursInputHasError,
        valueChangedHandler: workHoursChangedHandler,
        inputBlurHandler: workHoursBlurHandler,
    } = useInput(initialWorkHours, isNotEmpty);

    const {
        value: enteredChainsawHours,
        isValid: enteredChainsawHoursIsValid,
        hasError: chainsawHoursInputHasError,
        valueChangedHandler: chainsawHoursChangedHandler,
        inputBlurHandler: chainsawHoursBlurHandler,
    } = useInput(initialChainsawHours, isNotEmpty);

    const {
        value: enteredMachineHours,
        isValid: enteredMachineHoursIsValid,
        hasError: machineHoursInputHasError,
        valueChangedHandler: machineHoursChangedHandler,
        inputBlurHandler: machineHoursBlurHandler,
    } = useInput(initialMachineHours, isNotEmpty);

    let formIsValid = false;

    if (enteredDateIsValid
        && enteredCustomerIsValid
        && enteredLocationIsValid
        && enteredTokenIsValid
        && enteredTaskIsValid
        && enteredCommentIsValid
        && enteredEmployeeIsValid
        && enteredWorkHoursIsValid
        && enteredChainsawHoursIsValid
        && enteredMachineHoursIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        if (!enteredDateIsValid
            || !enteredCustomerIsValid
            || !enteredLocationIsValid
            || !enteredTokenIsValid
            || !enteredTaskIsValid
            || !enteredCommentIsValid
            || !enteredEmployeeIsValid
            || !enteredWorkHoursIsValid
            || !enteredChainsawHoursIsValid
            || !enteredMachineHoursIsValid) {
            return;
        }

        props.onSubmit({
            id: initialId,
            date: enteredDate,
            customer: enteredCustomer,
            location: enteredLocation,
            token: enteredToken,
            task: enteredTask,
            comment: enteredComment,
            employee: enteredEmployee,
            workHours: enteredWorkHours,
            chainsawHours: enteredChainsawHours,
            machineHours: enteredMachineHours
        })
    };

    const getFormControlClasses = (hasError) => {
        return hasError
            ? [classes.FormControl, classes.invalid].join(' ')
            : classes.FormControl.toString();
    };

    let buttonControls;

    switch (props.type) {
        case 'new':
            buttonControls =
                <Button disabled={!formIsValid}
                        onClick={formSubmissionHandler}>Submit</Button>;
            break;
        case 'edit':
            buttonControls =
                <div className={classes.EditFormButtonControls}>
                    <TextButton clicked={(event) => props.onBack(event)}>Zurück</TextButton>
                    <Button disabled={!formIsValid}
                            onClick={formSubmissionHandler}>Update</Button>
                </div>;
            break;
        default:
            break;
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={getFormControlClasses(dateInputHasError)}>
                <label htmlFor='date'>Date</label>
                <input type='date'
                       id='date'
                       onChange={dateChangedHandler}
                       onBlur={dateBlurHandler}
                       value={enteredDate}/>
            </div>
            {dateInputHasError && <p className={classes.errorText}>Date must not be empty!</p>}
            <div className={getFormControlClasses(customerInputHasError)}>
                <label htmlFor='customer'>Customer</label>
                <input type='text'
                       id='customer'
                       onChange={customerChangedHandler}
                       onBlur={customerBlurHandler}
                       value={enteredCustomer}/>
            </div>
            {customerInputHasError &&
            <p className={classes.errorText}>Customer must not be empty!</p>}
            <div className={getFormControlClasses(locationInputHasError)}>
                <label htmlFor='text'>Location</label>
                <input type='text'
                       id='location'
                       onChange={locationChangedHandler}
                       onBlur={locationBlurHandler}
                       value={enteredLocation}/>
                {locationInputHasError &&
                <p className={classes.errorText}>Location must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(tokenInputHasError)}>
                <label htmlFor='text'>Token</label>
                <input
                    type='text'
                    id='token'
                    onChange={tokenChangedHandler}
                    onBlur={tokenBlurHandler}
                    value={enteredToken}/>
                {tokenInputHasError &&
                <p className={classes.errorText}>Token must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(taskInputHasError)}>
                <label htmlFor='text'>Task</label>
                <input type='text'
                       id='task'
                       onChange={taskChangedHandler}
                       onBlur={taskBlurHandler}
                       value={enteredTask}/>
                {taskInputHasError && <p className={classes.errorText}>Task must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(commentInputHasError)}>
                <label htmlFor='text'>Comment</label>
                <input type='text'
                       id='comment'
                       onChange={commentChangedHandler}
                       onBlur={commentBlurHandler}
                       value={enteredComment}/>
            </div>
            <div className={getFormControlClasses(employeeInputHasError)}>
                <label htmlFor='text'>Employee</label>
                <input type='text'
                       id='employee'
                       onChange={employeeChangedHandler}
                       onBlur={employeeBlurHandler}
                       value={enteredEmployee}/>
                {employeeInputHasError &&
                <p className={classes.errorText}>Employee must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(workHoursInputHasError)}>
                <label htmlFor='text'>Work Hours</label>
                <input type='number'
                       id='workHours'
                       onChange={workHoursChangedHandler}
                       onBlur={workHoursBlurHandler}
                       value={enteredWorkHours}/>
                {workHoursInputHasError &&
                <p className={classes.errorText}>WorkHours must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(chainsawHoursInputHasError)}>
                <label htmlFor='text'>Chainsaw Hours</label>
                <input type='number'
                       id='chainsawHours'
                       onChange={chainsawHoursChangedHandler}
                       onBlur={chainsawHoursBlurHandler}
                       value={enteredChainsawHours}/>
                {chainsawHoursInputHasError &&
                <p className={classes.errorText}>ChainsawHours must not be empty!</p>}
            </div>
            <div className={getFormControlClasses(machineHoursInputHasError)}>
                <label htmlFor='text'>Machine Hours</label>
                <input type='number'
                       id='machineHours'
                       onChange={machineHoursChangedHandler}
                       onBlur={machineHoursBlurHandler}
                       value={enteredMachineHours}/>
                {machineHoursInputHasError &&
                <p className={classes.errorText}>MachineHours must not be empty!</p>}
            </div>
            <div className="form-control">
                {buttonControls}
            </div>
        </form>
    );
};

export default WorkHoursForm;