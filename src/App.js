import React, {Component} from 'react';
import './App.css';
import TextArea from "./TextArea";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {

    componentDidMount() {
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
                <Header/>
                <TextArea/>
                <Footer/>
            </div>
        );
    }
}

export default App;
