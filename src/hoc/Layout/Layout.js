import React, {useState} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(true);

    // const sideDrawerCloseHandler = () => {
    //     setShowSideDrawer(false);
    // }
    
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <ToolBar drawerToggle={sideDrawerToggleHandler}/>
            {/* <SideDrawer closed={sideDrawerCloseHandler} open={showSideDrawer} /> */}
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;