import {Link} from 'react-router-dom';

const AllWorkHours = () => {
    return (
        <div>
            <Link to='/erfassen'><button>erfassen</button></Link>
            <p>All Work Hours</p>
        </div>
    );
};

export default AllWorkHours;