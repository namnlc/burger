import React, {useState} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(true);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    return (
        <Aux>
            <ToolBar />
            <SideDrawer closed={sideDrawerCloseHandler} open={showSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;