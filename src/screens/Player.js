import React from "react";
import {
  
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  
} from "react-native";
import { TouchableOpacity,FlatList,ScrollView } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import {
  AppStyles,
} from "../AppStyles";
import { scrollInterpolator, animatedStyles } from '../components/utils';
import Line from '../components/Line';
import YoutubePlayer from 'react-native-youtube-iframe';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        videoId:'84WIaK3bl_s',
        play:true,
        data:[],
        page_no:1

    };
  }
  onpress =async (youtubeID) => {
    await this.setState({videoId:youtubeID,paly:true})
    this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true})
    this.render();
  }
  componentDidMount = () => {
    this.setState({videoId:this.props.navigation.state.params.data.youtubeID})
    // console.log('http://Sh.tasmiasolutions.com/api/mobile/get_videos?category_id='+this.props.navigation.state.params.data.category_id+'&page_no='+this.state.page_no+'&items_per_page='+this.state.items_per_page)
    axios({
      method: 'GET',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_videos?page_no='+this.state.page_no+'&category_id='+this.props.navigation.state.params.data.category_id
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        console.log(response.data)
        this.setState({data:response.data,page_no:this.state.page_no==response.meta.total_pages?0:this.state.page_no+1})
    });
  }
  popular_videos = ({item}) => {
    return (
      <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10,marginVertical:10 }} onPress={()=>{this.onpress(item.youtubeID)}}>
        <View style={{ flex:1}}>
          <View style={{ flex:.5 }}>
              <Image source={{ uri:item.imageURL }} style={{ width:wp("100%"),height:hp('30%') }} />
          </View>
          <View style={{ }}>
              <Text style={{ color:'white',fontSize:22 }}>{item.title}</Text>
              {/* <Text style={{ color:'#4D4639',fontSize:16 }}>2.8M Views 3 Months Ago</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
}
playVideo = () =>{
    return(
        <YoutubePlayer
            height={hp('30%')}
            play={this.state.play}
            videoId={this.state.videoId}
            showClosedCaptions={false}
            // onChangeState={onStateChange}
        />
    );
}
LoadMoreRandomData = () => {
  if(this.state.page_no>0){
  axios({
    method: 'get',
    url: 'http://Sh.tasmiasolutions.com/api/mobile/get_videos?page_no='+this.state.page_no+'&category_id='+this.props.navigation.state.params.data.category_id
    // responseType: 'stream'
  })
    .then(({ data: response }) => {
      // console.log(response.data)
      this.setState({data:this.state.data.concat(response.data),isLoading:false,page_no:this.state.page_no==response.meta.total_pages?0:this.state.page_no+1})
  });
}
}
FlatlistHeader = () => {
return(
            <View>
            <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,backgroundColor:'black',height:120,paddingTop:20,paddingLeft:20 }}>
                <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image source={ require('../assets/logo.png') } style={{width:45,height:45,marginHorizontal:10}}/>
                    <Text style={{ color:'white',fontSize:18 }}>Productions</Text>
                </View>
            </View>
            <View style={{  }}>
                {this.playVideo()}
            </View>
            <View style={{ paddingLeft:10,marginTop:-10 }}>
              <Text style={{ color:'white',fontSize:22 }}>{this.props.navigation.state.params.data.title}</Text>
                {/* <Text style={{ color:'#4D4639',fontSize:16 }}>2.8M Views 3 Months Ago</Text> */}
            </View>
            <View style={{ marginHorizontal:10,marginVertical:10 }}>
                <Line />
            </View>
            </View>
);
}
  render() {
    return (
        // <ScrollView ref={(ref) => { this.scrollListReftop = ref; }} style={styles.container}>
            
            <View style={styles.container}>
                <FlatList
                nestedScrollEnabled 
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                renderItem={(item) => this.popular_videos(item)}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={() => {
                  return this.FlatlistHeader()
                }}
                onEndReached={this.LoadMoreRandomData}
                onEndReachedThreadhold={0.5}
                />
            </View>
        // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161617",
    flex: 1,
    // padding: Configuration.home.listing_item.offset
  },
  title: {
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default HomeScreen;



