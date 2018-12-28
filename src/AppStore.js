import {action, observable} from "mobx";


const POSTFIX_ACTIVE = '_active';
const POSTFIX_HELP = '_help';

class AppStore {

    @observable appState = {
        count: 0,
        mode: 'Nomen',
        status: {},
        error: false,
        text: "Vor einem a-großen n-Wald v-wohnte ein a-armer n-Holzhacker mit seiner n-Frau und seinen a-zwei n-Kindern. Der n-Junge hieß n-Hänsel und das n-Mädchen n-Gretel. " +
            "Er v-hatte wenig zu v-beißen und zu v-brechen, und einmal, als eine a-große n-Hungersnot ins n-Land v-kam, v-konnte er auch das a-tägliche n-Brot nicht mehr v-bezahlen. " +
            "Wie er sich nun abends im n-Bett n-Gedanken v-machte und sich vor n-Sorgen v-herumwälzte, v-seufzte er und v-sprach zu seiner n-Frau: " +
            "'Was v-soll nur aus uns v-werden? Wie v-können wir unsere a-armen n-Kinder v-ernähren, da wir für uns selbst nichts mehr v-haben?' " +
            "' v-Weißt du was?', v-antwortete die n-Frau, 'wir v-wollen morgen früh die n-Kinder hinaus in den n-Wald v-führen, wo er am dicksten ist. " +
            "Da machen wir ihnen ein n-Feuer an und geben jedem noch ein n-Stückchen n-Brot. Dann gehen wir an unsere n-Arbeit und lassen sie allein. " +
            "Sie v-finden den n-Weg nicht wieder nach n-Hause und wir v-sind sie los.' " +
            "'Nein', v-sagte der n-Mann, 'das v-tue ich nicht! Wie v-sollte ich es übers n-Herz v-bringen meine n-Kinder im n-Wald allein zu v-lassen? " +
            "Die a-wilden n-Tiere v-werden bald v-kommen und sie v-zerreißen.' 'O du n-Narr,' sagte sie, 'dann v-müssen wir alle n-Viere am n-Hunger v-sterben. " +
            "Du v-kannst nur die n-Bretter für die n-Särge v-hobeln.' Und sie v-ließ ihm keine n-Ruhe bis er v-einwilligte."
    };

    @action check = async (type, index) => {
        if (this.isActive(type, index)) {
            return; // already clicked
        }
        if (this.appState.mode === type) {
            this.appState.count++;
            this.appState.status[index] = type;
        }
        else {
            this.appState.count--;
            this.appState.error = true;
            setTimeout(() => this.appState.error = false, 200);

            let audio = new Audio('/sounds/nein.mp3');
            await audio.play();
        }
    };

    isActive = (type, index) => {
        let localStatus = this.status(index);
        if (localStatus && (localStatus.endsWith(POSTFIX_ACTIVE) || localStatus.endsWith(POSTFIX_HELP))) {
            return false;
        }
        else {
            return true;
        }
    }

    status = (index) => {
        let status = this.appState.status[index];
        if (status) {
            return status;
        }
        else {
            return undefined;
        }
    }

    initStatus = (type, index) => {
        this.appState.status[index] = type + POSTFIX_ACTIVE;
    }

    countWords = (filter) => {
        return Object.values(this.appState.status).filter(filter).length
    }

    getRemaining = () => {
        let filter = (value) =>
                this.appState.mode + POSTFIX_ACTIVE === value
                || this.appState.mode + POSTFIX_HELP === value;
        return this.countWords(filter);
    }

    @action help = () => {
        let filter = this.appState.mode + POSTFIX_ACTIVE;
        let entries = Object.entries(this.appState.status).filter(entry => filter === entry[1]);
        if (entries.length > 0) {
            this.appState.status[entries[0][0]] = this.appState.mode + POSTFIX_HELP;
            this.appState.count = this.appState.count - 2;
        }
    }

    @action nextLevel = () => {
        if (this.appState.mode === 'Nomen') {
            this.appState.mode = 'Verb';
        }
        else if (this.appState.mode === 'Verb') {
            this.appState.mode = 'Adjektiv';
        }
    }

}

const store = new AppStore();
export default store;