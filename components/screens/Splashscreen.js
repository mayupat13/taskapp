import React, { Component } from 'react'
import { 
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  Text
} 
from 'react-native'

const {width,height} = Dimensions.get('window');
import NetInfo from "@react-native-community/netinfo";




class Splashscreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  
componentDidMount() {
  this.fetchdata();
} 





 fetchdata() {
  const { navigate } = this.props.navigation

  NetInfo.fetch().then(state => {

      if (state.isConnected == !true) {
        this.fetchdata()
      }else{
        this.timeoutHandle = setTimeout(()=>{
          navigate('Home');
        }, 2000);
      }
    });
};


render() {
  
    return(
      
      <SafeAreaView style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
        <StatusBar backgroundColor='#000' barStyle="light-content" />
        <Image
          style={{width:170,height:170,resizeMode:"cover"}}
          source={require('../img/splash.jpg')}
        /> 
      </SafeAreaView>
    );
  }
}



export default Splashscreen;