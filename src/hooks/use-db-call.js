import {FIREBASE_COLLECTION_BASE_URL} from '../consts/consts';

const useDbCall = () => {
    const makeDbRequest = (collection, method, body) => {
        const url = FIREBASE_COLLECTION_BASE_URL + collection;
        if (body) {
            return fetch(url, {
                method: method,
                body: JSON.stringify({
                    ...body
                })
            });
        } else {
            return fetch(url, {
                method: method,
            })
        }
    }
    return ({
        makeDbRequest: makeDbRequest
    });
};

export default useDbCall;