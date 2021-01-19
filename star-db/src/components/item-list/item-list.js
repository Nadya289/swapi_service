import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../../components/spinner/spinner';
import './item-list.css';


export default class ItemList extends Component {

swapiService = new SwapiService();

state = {
    peopleList: null
};
componentDidMount(){
    this.swapiService
    .getAllPeople()
    .then((peopleList) => {
        this.setState({
            peopleList
        });
    });
}
renderItems (arr) {
    return arr.map((e, id) => {
        return(
            <li className='list-group-item'
                key={id+1}
                onClick = {() => this.props.onItemSelected(id+1)}> 
                {e.name}
            </li>
        )
    });
}

render(){

    const {peopleList} = this.state;
    if(!peopleList){
        return <Spinner/>
    }
    const items = this.renderItems(peopleList);
    return(
        <ul className = 'item-list list-group'>
            {items}
        </ul>

    );
}
};

