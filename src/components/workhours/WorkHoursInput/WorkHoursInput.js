import {useRef, useState} from 'react';
import './WorkHoursInput.css';

const WorkHoursInput = (props) => {

    const customerInputRef = useRef();
    const [enteredCustomer, setEnteredCustomer] = useState('');
    const [enteredCustomerIsValid, setEnteredCustomerIsValid] = useState(false);

    const customerInputChangeHandler = event => {
        setEnteredCustomer(event.target.value);
    };

    const formSubmissionHandler = event => {
        event.preventDefault();

        if(enteredCustomer.trim() === '') {
            setEnteredCustomerIsValid(false);
            return;
        }

        setEnteredCustomerIsValid(true);

        console.log(enteredCustomer);
        setEnteredCustomer('');
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="form-control">
                <label htmlFor='date'>Date</label>
                <input type='date' id='date'/>
            </div>
            <div className="form-control">
                <label htmlFor='customer'>Customer</label>
                <input ref={customerInputRef} type='text' id='customer' onChange={customerInputChangeHandler} value={enteredCustomer}/>
            </div>
            {!enteredCustomerIsValid && <p className="error-text">Customer must not be empty!</p>}
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
                <button>Submit</button>
            </div>
        </form>
    );
};

export default WorkHoursInput;