import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-button/error-button';
import './person-details.css';

export default class PersonDetails extends Component{
    swapiService = new SwapiService();
    state = {
        person:null,
        loading:true,
        error: false
    };

    componentDidMount(){
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId !== prevProps.personId){
            this.updatePerson();
        }
    }
    onPersonLoaded = (person) => {
        this.setState({ 
          person,
          loading:false 
      });
      };
      
      onError = (err) => {
        this.setState({
          error:true,
          loading:false
        });
      };

    updatePerson(){
        const {personId} = this.props;
        if(!personId) {
            return;
        }
        this.swapiService
        .getPerson(personId)
        .then(this.onPersonLoaded)
        .catch(this.onError);
        
        // .then((person) => {
        //     this.setState({person});
        // });
    }
    
    render(){

        const {person, loading, error} = this.state;
        const hasData = !(loading|| error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PersonView person = {person}/> : null; 

        if(!this.state.person){
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

const PersonView = ({person}) => {
    const{name, gender, birthYear, eyeColor, id} = person;
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