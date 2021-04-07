import React, {Component} from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';

/**
 * Holds the page layout
 */
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Aux>
                {/*<Toolbar />*/}
                {/*<SideDrawer />*/}
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    };
}

export default Layout;