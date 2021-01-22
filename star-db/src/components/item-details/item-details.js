import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-button/error-button';
import './item-details.css';

const Record = ({ item, field, label }) => {
    return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{ field }</span>
      </li>
    );
  };
  
  export {
    Record
  };

export default class ItemDetails extends Component{
    swapiService = new SwapiService();

    state = {
        item:null,
        loading:false,
        image: null,
        error: false
    };

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate =(prevProps)=> {
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
      }

      updateItem = () => {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
          return;
        }
        getData(itemId)
        .then((item) => {
            const res={id:itemId}
            this.setState({ item:item, image:getImageUrl(res)})
          });
      }
        
        // .then((person) => {
        //     this.setState({person});
        // });

    
    render(){

        const ItemView = ({item,}) => {
            const{name, id, image} = item;
            return(
                <React.Fragment>
                     <img className ='person-image person-details'  
                        src = {image}
                        alt='pic'/>
                <div className='card-body'> 
                    <h4>{name}</h4>
                    <ul className='list-group list-group-flush'>
                        { 
                            React.Children.map(this.props.children, (child)=>{
                                return child;
                            })
                        }
                    </ul>
                    <ErrorButton/>
                </div>
                </React.Fragment>
            );
        }
        const {item, loading, error, image} = this.state;
        const hasData = !(loading|| error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ItemView item = {item} image= {image}/> : null; 

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

