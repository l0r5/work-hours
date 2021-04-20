import './WorkHoursInput.css';

import useInput from '../../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';

const WorkHoursInput = (props) => {
    const {
        value: enteredCustomer,
        isValid: enteredCustomerIsValid,
        hasError: customerInputHasError,
        valueChangedHandler: customerChangedHandler,
        inputBlurHandler: customerBlurHandler,
        reset: resetCustomerInput
    } = useInput(isNotEmpty);

    const {
        value: enteredLocation,
        isValid: enteredLocationIsValid,
        hasError: locationInputHasError,
        valueChangedHandler: locationChangedHandler,
        inputBlurHandler: locationBlurHandler,
        reset: resetLocationInput
    } = useInput(isNotEmpty);

    const {
        value: enteredToken,
        isValid: enteredTokenIsValid,
        hasError: tokenInputHasError,
        valueChangedHandler: tokenChangedHandler,
        inputBlurHandler: tokenBlurHandler,
        reset: resetTokenInput
    } = useInput(isNotEmpty);

    const {
        value: enteredTask,
        isValid: enteredTaskIsValid,
        hasError: taskInputHasError,
        valueChangedHandler: taskChangedHandler,
        inputBlurHandler: taskBlurHandler,
        reset: resetTaskInput
    } = useInput(isNotEmpty);

    let formIsValid = false;

    if (enteredCustomerIsValid && enteredLocationIsValid && enteredTokenIsValid && enteredTaskIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        if(!formIsValid) {
            return;
        }

        if (!enteredCustomerIsValid || !enteredLocationIsValid || !enteredTokenIsValid || !enteredTaskIsValid) {
            return;
        }

        console.log('Submitted');
        console.log(enteredCustomer);
        console.log(enteredLocation);
        console.log(enteredToken);
        console.log(enteredTask);

        resetCustomerInput();
        resetLocationInput();
        resetTokenInput();
        resetTaskInput();
    };
    const customerInputClasses = customerInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const locationInputClasses = customerInputHasError
        ? 'form-control invalid'
        : 'form-control';
    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="form-control">
                <label htmlFor='date'>Date</label>
                <input type='date' id='date'/>
            </div>
            <div className={customerInputClasses}>
                <label htmlFor='customer'>Customer</label>
                <input type='text'
                       id='customer'
                       onChange={customerChangedHandler}
                       onBlur={customerBlurHandler}
                       value={enteredCustomer}/>
            </div>
            {customerInputHasError && <p className="error-text">Customer must not be empty!</p>}
            <div className={locationInputClasses}>
                <label htmlFor='text'>Location</label>
                <input type='text'
                       id='location'
                       onChange={locationChangedHandler}
                       onBlur={locationBlurHandler}
                       value={enteredLocation}/>
                {locationInputHasError && <p className="error-text">Location must not be empty!</p>}
            </div>
            <div className={locationInputClasses}>
                <label htmlFor='text'>Token</label>
                <input
                    type='text'
                    id='token'
                    onChange={tokenChangedHandler}
                    onBlur={tokenBlurHandler}
                    value={enteredToken}/>
                {tokenInputHasError && <p className="error-text">Token must not be empty!</p>}
            </div>
            <div className={locationInputClasses}>
                <label htmlFor='text'>Task</label>
                <input type='text'
                       id='task'
                       onChange={taskChangedHandler}
                       onBlur={taskBlurHandler}
                       value={enteredTask}/>
                {taskInputHasError && <p className="error-text">Task must not be empty!</p>}
            </div>
            <div className="form-control">
                <label htmlFor='text'>Comment</label>
                <input type='text' id='comment'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Employee</label>
                <input type='text' id='employee'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Work Hours</label>
                <input type='number' id='workHours'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Hours Chainsaw</label>
                <input type='number' id='hoursChainsaw'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Hours Machine</label>
                <input type='number' id='hoursMachine'/>
            </div>
            <div className="form-control">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default WorkHoursInput;