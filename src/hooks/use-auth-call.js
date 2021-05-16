import {FIREBASE_AUTH_BASE_URL} from '../consts/consts';

const useAuthCall = () => {
    const makeAuthRequest = async (operation, method, body, headers) => {
        const url = FIREBASE_AUTH_BASE_URL + operation + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY;
        if (headers) {
            return await fetch(url, {
                method: method,
                body: JSON.stringify({
                    ...body
                }),
                headers: headers
            });
        } else {
            return await fetch(url, {
                method: method,
                body: JSON.stringify({
                    ...body
                }),
            });
        }
    }
    return ({
        makeAuthRequest: makeAuthRequest
    });

};

export default useAuthCall;