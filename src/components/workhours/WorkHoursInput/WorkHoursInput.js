import {useState} from 'react';
import './WorkHoursInput.css';

const WorkHoursInput = (props) => {
    const [enteredCustomer, setEnteredCustomer] = useState('');
    const [enteredCustomerTouched, setEnteredCustomerTouched] = useState(false);

    const enteredCustomerIsValid = enteredCustomer.trim() !== '';
    const customerInputIsInvalid = !enteredCustomerIsValid && enteredCustomerTouched;

    let formIsValid = false;

    if (enteredCustomerIsValid) {
        formIsValid = true;
    }

    const customerInputChangeHandler = event => {
        setEnteredCustomer(event.target.value);
    };

    const customerInputBlurHandler = event => {
        setEnteredCustomerTouched(true);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        setEnteredCustomerTouched(true);

        if (!enteredCustomerIsValid) {
            return;
        }

        console.log(enteredCustomer);
        setEnteredCustomer('');
        setEnteredCustomerTouched(false);
    };
    const customerInputClasses = customerInputIsInvalid ? 'form-control invalid' : 'form-control';

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
                       onChange={customerInputChangeHandler}
                       onBlur={customerInputBlurHandler}
                       value={enteredCustomer}/>
            </div>
            {customerInputIsInvalid && <p className="error-text">Customer must not be empty!</p>}
            <div className="form-control">
                <label htmlFor='text'>Location</label>
                <input type='text' id='location'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Token</label>
                <input type='text' id='token'/>
            </div>
            <div className="form-control">
                <label htmlFor='text'>Task</label>
                <input type='text' id='task'/>
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