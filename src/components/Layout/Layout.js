import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.module.css';
const layout = (props) => (
    <Aux>
        <div className="content"> ToolBar, SideDrawer, Backdrop</div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
);

export default layout;