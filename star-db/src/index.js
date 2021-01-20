import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import PeoplePage from './components/people-page/people-page';
import ItemList from './components/item-list/item-list';
import RandomPlanet from './components/random-planet/random-planets';
import PersonDetails from './components/person-details/person-details';
import StarShips from './components/straship-details/starship-details';
import ErrorButton from './components/error-button/error-button';
import ErrorIndicator from './components/error-indicator/error-indicator';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError:false
    
 };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch(){
    this.setState({hasError:true});
  }

 render() {

  if(this.state.hasError){
    return<ErrorIndicator/>
  }
    
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (

       <div className="stardb-app">
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton/>

        <PeoplePage/>
        <PeoplePage/>
        <PeoplePage/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, 
    document.getElementById('root'));