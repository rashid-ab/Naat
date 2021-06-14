import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  FlatList
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import {
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import { scrollInterpolator, animatedStyles } from '../components/utils';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      index: 0,
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
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity>
        <ImageBackground style={styles.itemContainer} source={{ uri:item.image }}>
          <View style={{ flex:.7,justifyContent:'center',alignItems:'center',paddingTop:38 }}>
              <Image source={require('../assets/play.png')} />
          </View>
          <View style={{ flex:.3,justifyContent:'flex-start',paddingLeft:20 }}>
            <Text style={{ fontSize:25,color:'white' }}>{ item.title }</Text>
            <Text style={{ fontSize:15,color:'#5289AD' }}>{ item.duration }</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  popular_videos = ({item}) => {
      return (
        <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10,marginVertical:10 }}>
          <View style={{ flex:1,flexDirection:'row',alignItems:"center" }}>
            <View style={{ flex:.5 }}>
                <Image source={{ uri:item.image }} style={{ width:150,height:150,borderRadius:10 }} />
            </View>
            <View style={{ marginHorizontal:10,flex:.5 }}>
                <Text style={{ color:'white',fontSize:16 }}>Dam Hama Dam FT. Asif Ali Dadiyaan</Text>
                <Text style={{ color:'#4D4639',fontSize:12 }}>2.8M Views 3 Months Ago</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  }
  componentDidMount() {
   
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,backgroundColor:'black',height:120,paddingTop:20,paddingLeft:20 }}>
          <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={ require('../assets/logo.png') } style={{width:45,height:45,marginHorizontal:10}}/>
            <Text style={{ color:'white',fontSize:18 }}>Productions</Text>
          </View>
          <TouchableOpacity style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:'#161617',padding:10,borderRadius:50,marginHorizontal:10}}>
            <Image source={ require('../assets/search.png') } style={{width:25,height:25}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ paddingLeft:20,paddingTop:20 }} onPress={() => this.props.navigation.goBack()}>
                <Image source={ require('../assets/back.png') } style={{width:30,height:25,marginHorizontal:10}}/>
        </TouchableOpacity>
        <View style={{ paddingTop:40,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:35 }}>Hamd</Text>
          <Text style={{ color:'white',fontSize:20,paddingTop:10 }}>Recently Played</Text>
        </View>
        <View>
          <Carousel
            ref={(c) => this.carousel = c}
            data={this.state.data}
            renderItem={this._renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={(index) => this.setState({ index })}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}          
          />
          {/* <Text style={styles.counter}
          >
            {this.state.index}
          </Text> */}
      </View>
      <View style={{ paddingTop:20,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:20,paddingTop:10 }}>All Videos</Text>
      </View>
      <View style={{ paddingLeft:20,paddingVertical:20 }}>
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
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  },
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default HomeScreen;
