import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import {
  AppStyles,
} from "../AppStyles";
import { scrollInterpolator, animatedStyles } from '../components/utils';
import Line from '../components/Line';
import YoutubePlayer from 'react-native-youtube-iframe';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        videoId:'84WIaK3bl_s',
        play:true,
        data:[
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
            {image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem',duration:'19:20'},
          ]
    };
  }
  onpress =async () => {
    await this.setState({videoId:'v7K4vGYL9zI',paly:true})
    this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true})
    this.render();
  }
  popular_videos = ({item}) => {
    return (
      <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10,marginVertical:10 }} onPress={()=>{this.onpress()}}>
        <View style={{ flex:1}}>
          <View style={{ flex:.5 }}>
              <Image source={{ uri:item.image }} style={{ width:wp("100%"),height:hp('30%') }} />
          </View>
          <View style={{ }}>
              <Text style={{ color:'white',fontSize:22 }}>Dam Hama Dam FT. Asif Ali Dadiyaan</Text>
              <Text style={{ color:'#4D4639',fontSize:16 }}>2.8M Views 3 Months Ago</Text>
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
  componentDidMount() {
   
  }

  render() {
    return (
        <ScrollView ref={(ref) => { this.scrollListReftop = ref; }} style={styles.container}>
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
                <Text style={{ color:'white',fontSize:22 }}>Dam Hama Dam FT. Asif Ali Dadiyaan</Text>
                <Text style={{ color:'#4D4639',fontSize:16 }}>2.8M Views 3 Months Ago</Text>
            </View>
            <View style={{ marginHorizontal:10,marginVertical:10 }}>
                <Line />
            </View>
            <View style={{  }}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                renderItem={(item) => this.popular_videos(item)}
                keyExtractor={(item, index) => index}
                />
            </View>
        </ScrollView>
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