import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';

import './people-page.css';



export default class PeoplePage extends Component{
    swapiService= new SwapiService();
   
    state ={
        selectedPerson:3,
        hasError:false
    };

    componentDidCatch(){

        this.setState({
            hasError:true
        });
    }

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
            getData = {this.swapiService.getAllPeople}
            renderItem = {({name, gender, birthYear}) => `${name}
            (Gender: ${gender},
            Birth year: ${birthYear})`} />
        );
       const personDetails =(
        <PersonDetails  personId = {this.state.selectedPerson}/>
       );
        return(
         <div>
            <Row left={itemList} right = {personDetails}/>
          </div> 
        );

    }
}