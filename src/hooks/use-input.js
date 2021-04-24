import {useState} from 'react';

const useInput = (initialValue, validateValue) => {

    const [enteredValue, setEnteredValue] = useState(initialValue ? initialValue : '');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangedHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangedHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;