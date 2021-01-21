import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';

import './people-page.css';


export default class PeoplePage extends Component{
    swapiService= new SwapiService();
   
    state ={
        selectedPerson:3,
        
    };


    onPersonSelected = (id) => {
        this.setState({
          selectedPerson:id
        });
      };
   
    render(){

        if(this.state.hasError){
            return<ErrorIndicator/>;
        }
        const itemList = (
          <ItemList 
            onItemSelected = {this.onPersonSelected}
            getData = {this.swapiService.getAllPeople}> 
               {(i) => (`${i.name} (Birth year: ${i.birthYear})`)}
          </ItemList>
        );
       const personDetails =(
        <ItemDetails  personId = {this.state.selectedPerson}/>
       );
        return(
         <ErrorBoundry>
            <Row left={itemList} right = {personDetails}/>
          </ErrorBoundry> 
        );

    }
}