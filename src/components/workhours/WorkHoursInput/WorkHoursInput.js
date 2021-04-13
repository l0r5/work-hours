import styles from './WorkHoursInput.module.css';

const WorkHoursInput = (props) => {
    return (
        <form>
            <div className={styles.formControl}>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date'/>
            </div>
            <div className={styles.formControl}>
                <label htmlFor='customer'>Customer</label>
                <input type='text' id='customer'/>
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