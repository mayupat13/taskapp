import React, { Component,PureComponent } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  StatusBar, 
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Share,
  ActivityIndicator
   } from 'react-native';

   import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-community/async-storage';

import Video from 'react-native-video';
import NetInfo from "@react-native-community/netinfo";


var { height, width } = Dimensions.get('window');






class Each_Video extends Component {


  constructor(props) {
      super(props);
      this.state = {
        resizeMode: 'cover',
        currentVisibleIndex:0,
        button_text:'',
        likecount:0,
        checknext:true
      };
    }

video: Video;




componentDidMount(){

  this.video.seek(0)

  this.setState({
    likecount: this.props.video_data.count_likes,
  });


  if(this.props.video_data.is_liked == null){
    this.setState({
      button_text: "like",
    });
  }else{
    this.setState({
      button_text: "liked",
    });
  }

  console.log(this.props.currentIndex,'currentIndex')
}




// UNSAFE_componentWillReceiveProps({currentVisibleIndex}) {

//   // alert(currentVisibleIndex)
//   this.setState({
//     currentVisibleIndex:currentVisibleIndex
//   })

//   // console.log(this.state.currentVisibleIndex,'currentVisibleIndex')
//   // console.log(this.props.currentIndex,'currentIndex')

// if (this.state.checknext == true) {
//   if (this.state.currentVisibleIndex == 6) {
//     console.log(this.state.currentVisibleIndex,'reached @')
//     this.setState({
//       checknext: false,
//     });
//     this.props.handler();
//   }
// }
  
// }



shouldComponentUpdate({currentVisibleIndex}, nextState) {

console.log(this.state.currentVisibleIndex,'currentVisibleIndex')


  if (currentVisibleIndex != this.state.currentVisibleIndex) {

    this.setState({
      currentVisibleIndex:currentVisibleIndex
    })

  }


  // if (this.state.currentVisibleIndex == 6) {
  //   console.log(this.state.currentVisibleIndex,'reached @ 6')
  //    this.props.handler
  // }


    return currentVisibleIndex != this.state.currentVisibleIndex;
}




// componentDidUpdate(prevProps) {

//   console.log(prevProps)
//   // if(!equal(this.props.user, prevProps.user)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
//   // {
//   //   this.updateUser();
//   // }
// }













onBuffer = (data) => {
  console.log('inbuffer')
  console.log(data)
};


onLoad = (data) => {
  console.log(data)
};




async Dolike() {

  if (this.state.button_text === "liked") {

    let likes =  Number(this.state.likecount) - 1;

   this.setState({
     button_text: "like",
     likecount : likes
   });

 } else {

   let likes =  Number(this.state.likecount) + 1;

   this.setState({
     button_text: "liked",
     likecount : likes
   });
 }

}



async onShare(link) {

  console.log(link)

  try {
    const result = await Share.share({
        // title:'',
        message:`www.stumbler.com${link}`,
        url:`www.stumbler.com${link}`
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        // console.log(result.activityType,result.action,Share.sharedAction,'1')
      } else {
        // shared
        // console.log(result.activityType,result.action,Share.sharedAction,'2')
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


render() {

  const { navigate } = this.props.navigation;
  return(
        <ScrollView style={styles.content_screen}>

          <Video
            ref={(ref: Video) => { this.video = ref }}
            source={{ uri: this.props.video_data.source }}
            style={styles.videoview}
            rate={this.state.rate}
            paused={this.props.currentIndex !== this.state.currentVisibleIndex}
            resizeMode={this.state.resizeMode}
            repeat={true}
            poster={this.props.video_data.cloud_image_url}
            posterResizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
          />

          <View style={{padding:10}}>
            <Text numberOfLines={1} style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>{this.props.video_data.title}</Text>
            {/* <Text style={{color:'#fff'}}>{this.props.video_data.dimensions.width}</Text> */}
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15,marginBottom:10}}>
              
                  <View>
		                {this.state.button_text == 'liked' ? 
                    <TouchableWithoutFeedback onPress={()=>{this.Dolike()}}>
                      <View style={{flexDirection:'row'}}>
                        <Icon lineHeight={10} name="heart" onPress={()=>{this.Dolike()}}  color='red' size={23} />
                        <Text style={{color:'red',fontSize:16,marginLeft:5}}>{this.state.likecount}</Text>
                      </View>
                    </TouchableWithoutFeedback>
		                  :
		                  <View>
		                  	{this.props.video_data.count_likes == 0 ? 
                          <TouchableWithoutFeedback onPress={()=>{this.Dolike()}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon lineHeight={10} name="heart" onPress={()=>{this.Dolike()}}  color='#999' size={23} />
                            </View>
                          </TouchableWithoutFeedback>
				            	 :
                          <TouchableWithoutFeedback onPress={()=>{this.Dolike()}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon lineHeight={10} name="heart" onPress={()=>{this.Dolike()}}  color='#999' size={23} />
                              <Text style={{color:'#999',fontSize:16,marginLeft:5}}>{this.state.likecount}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        }
		                  </View>
		                }
	                </View>

                  <TouchableWithoutFeedback onPress={()=>{this.onShare(this.props.video_data.detail_url)}}>
                    <View style={{flexDirection:'row'}}>
                      <Icon lineHeight={10} name="share" onPress={()=>{this.Dolike()}}  color='#999' size={23} />
                      <Text style={styles.options_name}>SHARE</Text>
                    </View>
                  </TouchableWithoutFeedback>
              
            </View>
          </View>
          <View style={{borderBottomColor:'#ccc',borderBottomWidth:0.5}} />
          <View style={{padding:10}}>
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{this.props.video_data.comments_count} Comments</Text>
                <FlatList
                  //horizontal={true}
                  data={this.props.video_data.top_comments}
                  keyExtractor={(item, index) => index.toString() + item.user_name + item.id}
                  renderItem={({ item, index }) => (
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',padding:5}}>
                      <View>
                        {item.user_avatar == null || item.user_avatar == '' 
                          ? 
                            <Image style={styles.image} source={require('../img/logo.png')} />
                          :
                            <Image style={styles.image} source={{uri: item.user_avatar}} />
                        }
                      </View>
                      <View style={{borderRadius:10,backgroundColor:'#2f2f2f',padding:5,width:((2*width)/3),marginLeft:5}}>
                        <Text style={{color:'white',fontSize:15}}>{item.comment}</Text>
                        {item.count_replies == 0 ? null :
                          <Text style={{color:'rgb(0, 247, 255)',fontSize:12,fontWeight:'bold'}}>view {item.count_replies} replies</Text>
                        }
                      </View>
                    </View>
                    <View>
                      <Icon name="heart" color='#999' size={16} />
                      <Text style={{color:'white',fontSize:13}}>{item.count_likes}</Text>
                    </View>
                  </View>
                  )}
                />
          </View>
          
        </ScrollView>

  );
}

}






















export default class Home extends Component {

  static navigationOptions = {
    headerShown: false
  };


  constructor(props) {
      super(props);
      this.state = {
        alldata:[],
        alldata_size:0,
        isLoading:true,
        currentVisibleIndex:0,
        swipevalue:0,
        scrollnow:false,
        last_id:null
      };

      this.handler = this.handler.bind(this)

    }


  

componentDidMount(){
  

  NetInfo.fetch().then(state => {

    if (state.isConnected == !true) {
      this.componentDidMount()
    }else{
      this.fetchdata();
    }
  });
}


fetchdata() {

  const ctx = this

    const { navigate } = this.props.navigation;
    fetch("https://stumbler.com/apiv1/videos/", {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  // 'Content-Type': 'application/json',
                },
              })


         .then(function(response) {

          if (response.status == 401 || response.status == 403) {
            Alert.alert('Login to verify your account');
            //navigate("Auth");
            return;
            }else if (response.status == 503) {
              ctx.Try_again('Sorry','Service temporarily unavailable, Try again later.');
            }else if (response.status == 500 || response.status == 404 || response.status == 405 || response.status == 406) {
              ctx.Try_again('Sorry','Something went wrong please try again.');
            }else if (response.status == 415) {
              ctx.Try_again('Sorry','Unsupported media format.');
            }else if (response.status == 429) {
              ctx.Try_again('Sorry','Too many request, Try after some time.');
            }else if (response.status == 502) {
              ctx.Try_again('Sorry','Service temporarily unavailable Please try later.');
            }
          else if (response.status == 200){

            response.json().then((responseData) => {
                if (!responseData){
                Alert.alert('Try Again','Something went wrong')
                ctx.componentDidMount();
              }else
              {
                console.log(responseData,'data here');

                let last_id = responseData[responseData.length - 1].id;

                ctx.setState({
                  alldata:responseData,
                  alldata_size:responseData.length,
                  isLoading:false,
                  last_id:last_id,
                });

                console.log(last_id,'first last id');


                ctx.timeoutHandle = setTimeout(()=>{

                  ctx.setState({ 
                    scrollnow:true
                  });
              
                }, 4000);

              }
            })
          }
        }
      ).catch(function(err) {
          console.log('Fetch Error', err);
      });
};



  handler() {
    // this._onEndReached()
    console.log('asas')
  }




async _onEndReached(){
  console.log('in _onEndReached');
  console.log(this.state.last_id);

  // this.setState({
  //   isLoading1: true,
  // });


if(this.state.last_id != null){
 
       return fetch(`https://stumbler.com/apiv1/videos?max_id=${this.state.last_id}&limit=8`,
      {
         method: "GET",
                headers: {
                  'Accept': 'application/json',
                  // 'Content-Type': 'application/json',
                },
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (!responseData){
        Alert.alert('Try Again','Something went wrong')
        this._onEndReached();
      }else
      {
        console.log(responseData,'in end');
        
          let allpros = this.state.alldata.concat(responseData);
          let last_id = responseData[responseData.length - 1].id;

          console.log(last_id,'end last id');

          this.setState({
            alldata_size:allpros.length,
            alldata: allpros,
            last_id: responseData.results,
          });

      }
      }).catch((error) => {
         console.log(error);
       })
  }else{
    console.log("videos done");
  this.setState({
      isLoading1: false,
    });
  }
}






onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
        this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
};



  // onScroll(event) {
  //   var currentOffset = event.nativeEvent.contentOffset.y;
  //       var direction = currentOffset > this.offset ? 'down' : 'up';
  //   this.offset = currentOffset;
  //   console.log(direction);
  // },


UpdateDirection(value){

  this.setState({ 
    scrollnow: false 
  });

  this.timeoutHandle = setTimeout(()=>{

    this.setState({ 
      scrollnow: true 
    });

  }, 100);
  
  let old_swipe = Number(this.state.swipevalue);
  let new_swipe = Number(value);

  // console.log(old_swipe,'old value')
  // console.log(new_swipe,'new value')



  if (old_swipe < new_swipe) {
    console.log('in +1')
    this.setState({ 
      currentVisibleIndex: this.state.currentVisibleIndex + 1,
      swipevalue: new_swipe,
    });
  }


  if (old_swipe  == new_swipe) {
    console.log('in =')
    this.setState({ 
      currentVisibleIndex: this.state.currentVisibleIndex,
      swipevalue: new_swipe
    });
  }

  if (old_swipe > new_swipe) {
    console.log('in -1')
    this.setState({
      currentVisibleIndex: this.state.currentVisibleIndex - 1,
      swipevalue: new_swipe
    });
  }

    console.log(this.state.currentVisibleIndex,'updated_index')

}







render() {

    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
       <View style={{flex:1,justifyContent: 'center'}}>
          <ActivityIndicator color="#555" />
        </View>
  	);
}

    return(

    <View>
      <StatusBar backgroundColor='#000' barStyle="light-content" />

        <View>
          {this.state.alldata_size  === 0 ?
            <View>
                <Text> no data </Text> 
            </View>
            :
            <ScrollView
              //style={styles.container}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollBegin={() => this.setState({ begin: 'done'})}
              scrollEnabled={this.state.scrollnow}
              // onScroll={this.onScroll}
              onMomentumScrollEnd={(event) => { 
                let value = `${event.nativeEvent.contentOffset.x}`
                this.UpdateDirection(value)
               }}

              // onScroll={(event) => {
              //   this.setState({ end: 'notdone' })
              //   let value = `${event.nativeEvent.contentOffset.x}`
              //   console.log(value)
              //   this.UpdateDirection(value)
              // }}
              >
              
                <FlatList
                  horizontal={true}
                  data={this.state.alldata}
                  keyExtractor={(item, index) => index.toString() + item.detail_url + item.id}
                  onEndReached={this._onEndReached.bind(this)}
                  onEndReachedThreshold={0}
                  renderItem={({ item, index }) => (
                  <Each_Video
                      navigation = {this.props.navigation}
                      video_data={item}
                      currentIndex={index}
                      currentVisibleIndex={this.state.currentVisibleIndex}
                      handler = {this.handler}
                      />
                      )}

                  onViewableItemsChanged={this.onViewableItemsChanged}
                  viewabilityConfig={{
                      viewAreaCoveragePercentThreshold: 90
                  }}
                />
            </ScrollView>
          }
        </View>

    </View>

    );
  }
}



const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#222',
  // },
  content_screen: {
    flex:1,
    backgroundColor: '#222',
    width:width,
  },
  content: {
    backgroundColor: '#fff',
    marginBottom:15,
  },
  videoview: {
    width:width,
    height:400
  },
  options_name:{
    color:'#999',
    fontSize:16,
    marginLeft:5
  },
  image:{
    height:30,
    width:30,
    borderRadius:15
  }
})