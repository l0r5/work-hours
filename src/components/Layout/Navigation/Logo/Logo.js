
import appLogo from '../../../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={appLogo} alt={"WorkHours"}/>
    </div>
);

export default Logo;