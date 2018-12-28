import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import Word from './Word';
import './TextArea.css';

@inject('store')
@observer
class TextArea extends Component {

    getWords() {
        const {store} = this.props;
        return store.appState.text.split(' ');
    }

    mapWord = (word, index) => {
        let type = this.getType(word);
        if (type){
            let text = word.substring(2);
            if (type === 'Nomen') {
                return (<Word key={index} index={index} type='Nomen'>{text}</Word>);
            } else if (type === 'Verb') {
                return (<Word key={index} index={index} type='Verb'>{text}</Word>);
            } else if (type === 'Adjektiv') {
                return (<Word key={index} index={index} type='Adjektiv'>{text}</Word>);
            }
        } else {
            return (
                <Word key={index} index={index}>{word}</Word>
            );
        }
    }

    getType = (word) => {
        if (word.startsWith('n-')){
            return 'Nomen';
        } else if (word.startsWith('v-')){
            return 'Verb';
        } else if (word.startsWith('a-')){
            return 'Adjektiv';
        } else {
            return undefined;
        }
    }

    render() {
        const {store} = this.props;
        let style = 'TextArea';
        if (store.appState.error) {
            style = style + ' Error';
        }

        return (
            <div className={style}>
                {this.getWords().map(this.mapWord)}
            </div>
        );
    }
}

export default TextArea;