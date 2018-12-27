import React, {Component} from 'react';
import './App.css';
import TextArea from "./TextArea";
import Footer from "./Footer";

class App extends Component {

    xcomponentDidMount() {
        window.addEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault();
            // Chrome requires returnValue to be set
            e.returnValue = '';
        });
    }

    render() {
        return (
            <div className="App">
                <TextArea/>
                <Footer/>
            </div>
        );
    }
}

export default App;
