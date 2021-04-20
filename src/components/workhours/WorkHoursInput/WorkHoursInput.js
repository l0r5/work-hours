import styles from './WorkHoursInput.module.css';
import {useRef, useState} from 'react';

const WorkHoursInput = (props) => {

    const customerInputRef = useRef();
    const [enteredCustomer, setEnteredCustomer] = useState('');

    const customerInputChangeHandler = event => {
        setEnteredCustomer(event.target.value);
    };

    const formSubmissionHandler = event => {
        event.preventDefault();

        const enteredValue = customerInputRef.current.value;
        console.log(enteredValue);

        setEnteredCustomer('');
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={styles.formControl}>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='customer'>Customer</label>
                <input ref={customerInputRef} type='text' id='customer' onChange={customerInputChangeHandler} value={enteredCustomer}/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Location</label>
                <input type='text' id='location'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Token</label>
                <input type='text' id='token'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Task</label>
                <input type='text' id='task'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Comment</label>
                <input type='text' id='comment'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Employee</label>
                <input type='text' id='employee'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Work Hours</label>
                <input type='number' id='workHours'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Hours Chainsaw</label>
                <input type='number' id='hoursChainsaw'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='text'>Hours Machine</label>
                <input type='number' id='hoursMachine'/>
            </div>
            <div className={styles.formActions}>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default WorkHoursInput;