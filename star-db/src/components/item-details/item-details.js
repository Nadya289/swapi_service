import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-button/error-button';
import './item-details.css';

export default class ItemDetails extends Component{
    swapiService = new SwapiService();

    state = {
        item: null,
        loading:true,
        error: false
    };

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }
    onItemLoaded = (item) => {
        this.setState({ 
          item,
          loading:false 
      });
      };
      
      onError = (err) => {
        this.setState({
          error:true,
          loading:false
        });
      };

    updateItem(){
        const {itemId, getData} = this.props;
        if(!itemId) {
            return;
        }
        this.swapiService
        .getPerson(itemId)
        .then(this.onItemLoaded)
        .catch(this.onError);
        
        // .then((person) => {
        //     this.setState({person});
        // });
    }
    
    render(){

        const {item, loading, error} = this.state;
        const hasData = !(loading|| error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ItemView item = {item}/> : null; 

        if(!this.state.item){
            return <span> Select a person from a list</span>
        }
        if(loading){
            return <Spinner/>
          }
        return(
        <div className='person-details card'>
            {errorMessage}
           {content}
           {spinner}
           
        </div>
    );
    };
};

const ItemView = ({item}) => {
    const{name, gender, birthYear, eyeColor, id} = item;
    return(
        <React.Fragment>
             <img className ='person-image person-details'  
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
        <div> 
            <h4>{name}</h4>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                    <span className="term">Gender</span>
                    <span>{gender}</span> 
                </li>
                <li className='list-group-item'>
                    <span className="term">Birth Year</span>
                    <span>{birthYear}</span> 
                </li>
                <li className='list-group-item'>
                    <span className="term">Eye Color</span>
                    <span>{eyeColor}</span>
                </li>
            </ul>
            <ErrorButton/>
        </div>
        </React.Fragment>
    );
}