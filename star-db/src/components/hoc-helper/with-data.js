import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

const withData =(View, getData) => {
    return class extends Component{

        state = {
            data: null
        };
        
        componentDidMount(){
        
            const {getData} = this.props;
        
            getData()
            .then((data) => {
                this.setState({
                    itemList
                });
            });
        }
        
         render(){
            const {data} = this.state;
                if(!data){
                return <Spinner/>
                }
            return <View {...this.props} data = {data} />

        }
    };
};

export default withData;