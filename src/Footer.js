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

    renderButtons = () => {
        const {store} = this.props;
        let remaining = store.getRemaining();
        if (remaining === 0) {
            return (<button onClick={this.nextLevel}>Zur nächsten Wortart wechseln</button>);
        }
        else {
            return (<button onClick={this.help}>Hilfe</button>);
        }
    }

    render() {
        const {store} = this.props;

        return (
            <div className="Footer">
                <div className="Label">
                    Suche nach {store.appState.mode}
                </div>
                <div className="Footer-left">
                    {this.renderButtons()}
                </div>
                <div className="Footer-right">
                    <div className="Points">
                        Punkte: {store.appState.count}
                    </div>
                    <div className="Footer-remaining">
                        Noch übrig {store.getRemaining()}
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;
