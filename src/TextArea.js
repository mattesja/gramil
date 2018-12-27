import React, {Component} from 'react';
import Word from './Word';
import './TextArea.css';

export default class TextArea extends Component {

    state = {
        points: 0,
        text: "Vor einem großen n-Wald wohnte ein armer n-Holzhacker mit seiner n-Frau und seinen zwei n-Kindern. Der n-Junge hieß n-Hänsel und das n-Mädchen n-Gretel. " +
            "Er hatte wenig zu beißen und zu brechen, und einmal, als eine große n-Hungersnot ins n-Land kam, konnte er auch das tägliche n-Brot nicht mehr bezahlen. " +
            "Wie er sich nun abends im n-Bett n-Gedanken machte und sich vor n-Sorgen herumwälzte, seufzte er und sprach zu seiner n-Frau: " +
            "'Was soll nur aus uns werden? Wie können wir unsere armen n-Kinder ernähren, da wir für uns selbst nichts mehr haben?' " +
            "'Weißt du was?', antwortete die n-Frau, 'wir wollen morgen früh die n-Kinder hinaus in den n-Wald führen, wo er am dicksten ist. " +
            "Da machen wir ihnen ein n-Feuer an und geben jedem noch ein n-Stückchen n-Brot. Dann gehen wir an unsere n-Arbeit und lassen sie allein. " +
            "Sie finden den n-Weg nicht wieder nach n-Haus und wir sind sie los.' " +
            "'Nein', sagte der n-Mann, 'das tue ich nicht! Wie sollt ichs übers n-Herz bringen meine n-Kinder im n-Wald allein zu lassen? " +
            "Die wilden n-Tiere würden bald kommen und sie zerreißen.' 'O du n-Narr,' sagte sie, 'dann müssen wir alle n-Viere am n-Hunger sterben. " +
            "Du kannst nur die n-Bretter für die n-Särge hobeln.' Und sie ließ ihm keine n-Ruhe bis er einwilligte."
    };

    getWords() {
        const {text} = this.state;
        return text.split(' ');
    }

    mapWord = (word, index) => {
        if (word.startsWith('n-')){
            let text = word.substring(2);
            return (
                <Word key={index} index={index} type='Nomen'>{text}</Word>
            );
        } else {
            return (
                <Word key={index} index={index}>{word}</Word>
            );
        }
    }

    render() {
        return (
            <div className="TextArea">
                {this.getWords().map(this.mapWord)}
            </div>
        );
    }
}
