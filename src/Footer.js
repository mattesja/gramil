import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import './Footer.css';

@inject('store')
@observer
class Footer extends Component {

    help = () => {
        const {store} = this.props;
        store.help();
    }

    render() {
        const {store} = this.props;

        return (
            <div className="Footer">
                <div className="Label">
                    Suche nach {store.appState.mode}
                </div>
                <div className="Footer-left">
                    <button onClick={this.help}>Hilfe</button>
                </div>
                <div className="Footer-right">
                    <div className="Points">
                        Punkte: {store.appState.count}
                    </div>
                    <div className="remaining">
                        Noch übrig {store.getRemaining()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
