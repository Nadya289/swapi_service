import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import ItemList from './components/item-list/item-list';
import RandomPlanet from './components/random-planet/random-planets';
import PersonDetails from './components/person-details/person-details';
import StarShips from './components/straship-details/starship-details';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson:null
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson:id
    });
  };

  render() {

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

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected = {this.onPersonSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails  personId = {this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, 
    document.getElementById('root'));