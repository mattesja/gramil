import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import './Word.css';

@inject('store')
@observer
class Word extends Component {

    componentDidMount() {
        const {store, type, index} = this.props;
        store.initStatus(type, index);
    }

    check = async () => {
        const {store, type, index} = this.props;
        await store.check(type, index);
    }

    render() {
        const {store, type, index} = this.props;

        let text = this.props.children;
        if (type === 'Nomen' && !store.isActive(type, index)) {
            text = text.toLowerCase();
        }

        return (
            <React.Fragment>
                <span className={store.status(index)} onClick={this.check}>
                    {text}
                </span>
                <span> </span>
            </React.Fragment>
        );
    }
}

export default Word;