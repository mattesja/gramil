import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import Word from './Word';
import './TextArea.css';

@inject('store')
@observer
class TextArea extends Component {

    state = {
        points: 0,
        text: "Vor einem a-großen n-Wald v-wohnte ein a-armer n-Holzhacker"
    };

    /*
     "Vor einem a-großen n-Wald v-wohnte ein a-armer n-Holzhacker mit seiner n-Frau und seinen a-zwei n-Kindern. Der n-Junge hieß n-Hänsel und das n-Mädchen n-Gretel. " +
            "Er v-hatte wenig zu v-beißen und zu v-brechen, und einmal, als eine a-große n-Hungersnot ins n-Land v-kam, v-konnte er auch das a-tägliche n-Brot nicht mehr v-bezahlen. " +
            "Wie er sich nun abends im n-Bett n-Gedanken v-machte und sich vor n-Sorgen v-herumwälzte, v-seufzte er und v-sprach zu seiner n-Frau: " +
            "'Was v-soll nur aus uns v-werden? Wie v-können wir unsere a-armen n-Kinder v-ernähren, da wir für uns selbst nichts mehr v-haben?' " +
            "'v-Weißt du was?', v-antwortete die n-Frau, 'wir v-wollen morgen früh die n-Kinder hinaus in den n-Wald v-führen, wo er am dicksten ist. " +
            "Da machen wir ihnen ein n-Feuer an und geben jedem noch ein n-Stückchen n-Brot. Dann gehen wir an unsere n-Arbeit und lassen sie allein. " +
            "Sie v-finden den n-Weg nicht wieder nach n-Hause und wir v-sind sie los.' " +
            "'Nein', v-sagte der n-Mann, 'das v-tue ich nicht! Wie v-sollte ich es übers n-Herz v-bringen meine n-Kinder im n-Wald allein zu v-lassen? " +
            "Die a-wilden n-Tiere v-werden bald v-kommen und sie v-zerreißen.' 'O du n-Narr,' sagte sie, 'dann v-müssen wir alle n-Viere am n-Hunger v-sterben. " +
            "Du v-kannst nur die n-Bretter für die n-Särge v-hobeln.' Und sie v-ließ ihm keine n-Ruhe bis er v-einwilligte."
    };
     */

    getWords() {
        const {text} = this.state;
        return text.split(' ');
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