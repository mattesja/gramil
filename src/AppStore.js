import {action, observable} from "mobx";


const POSTFIX_ACTIVE = '_active';
const POSTFIX_HELP = '_help';

class AppStore {

    @observable appState = {
        count: 0,
        mode: 'Nomen',
        status: {},
        error: false
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