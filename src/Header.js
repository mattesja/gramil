import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import './Header-Footer.css';

@inject('store')
@observer
class Header extends Component {

    render() {
        const {store} = this.props;

        return (
            <div className="Border">
                <div className="Label">
                    Markiere alle {store.appState.mode}
                </div>
            </div>
        );
    }

}

export default Header;
