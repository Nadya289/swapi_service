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
import SwapiService from './services/swapi-service';

export default class App extends Component {

  swapiService = new SwapiService();

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
        
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
            onItemSelected = {this.onPersonSelected}
            getData={ this.swapiService.getAllPlanets}>
               {(i) => (`${i.name}`)}

           </ItemList>

          </div>
          <div className="col-md-6">
            <PersonDetails  personId = {this.state.selectedPerson}/>
          </div>     
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
            onItemSelected = {this.onPersonSelected}
            getData={ this.swapiService.getAllStarships}>
               {(i) => (`${i.name} (Model: ${i.model})`)}         
            </ItemList>
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