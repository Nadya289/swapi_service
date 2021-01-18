import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import ItemList from './components/item-list/item-list';
import RandomPlanet from './components/random-planet/random-planets';
import PersonDetails from './components/person-details/person-details';
import StarShips from './components/straship-details/starship-details';

const App = () => {
    return(
        <div>
            <Header/>
            <RandomPlanet/>
            <div className="row mb2">
        <div className="col-md-6">
          <ItemList />
        </div>
        <div className="col-md-6">
          <PersonDetails />
        </div>
        </div>
        </div>
    );
};

ReactDOM.render(<App/>, 
    document.getElementById('root'));