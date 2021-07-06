import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
  FlatList,
  TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import {
  AppStyles,
} from "../AppStyles";
import Line from '../components/Line';
import {Icon} from 'react-native-elements'
import { Configuration } from "../Configuration";
import { scrollInterpolator, animatedStyles } from '../components/utils';
import axios from 'axios';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      index: 0,
      searchString:'',
      searching:false,
      data:[],
      searchdata:[],
      videos:[],
      SearchDataLength:''
    };
  }
  componentDidMount = async() => {
    // await AsyncStorage.setItem({"url":"http://staging.shafiquesons.com/"})
   axios({
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_recent_videos',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        this.setState({data:response.data,visible:false})
    });
    axios({
      method: 'GET',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_videos?category_id='+this.props.navigation.state.params.id,
      // responseType: 'stream'
    })
        .then(({ data: response }) => {
        this.setState({videos:response.data,visible:false})
    });
  }
  searched = (text) => {
    if(text!=''){
    axios({
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/search_videos/'+text,
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        this.setState({searchdata:response.data,SearchDataLength:response.data.length<0?'false':'true',visible:false,searchString:text})
    });
  }
    // this.setState({searching:!this.state.searching,searchString:text})

  }
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Player',{data:{youtubeID:item.youtubeID,category_id:item.categoryID,title:item.title}})}}>
        <ImageBackground style={styles.itemContainer} source={{ uri:item.imageURL }}>
          <View style={{ flex:.7,justifyContent:'center',alignItems:'center',paddingTop:38 }}>
              <Image source={require('../assets/play.png')} />
          </View>
          <View style={{ flex:.3,justifyContent:'flex-start',paddingLeft:20 }}>
            <Text style={{ fontSize:12,color:'white' }}>{ item.title }</Text>
            <Text style={{ fontSize:15,color:'#5289AD' }}>{ item.duration }</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  popular_videos = ({item}) => {
      return (
        <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10,marginVertical:10 }} onPress={()=>{this.props.navigation.navigate('Player',{data:{youtubeID:item.youtubeID,category_id:item.categoryID,title:item.title}})}}>
          <View style={{ flex:1,flexDirection:'row',alignItems:"center" }}>
            <View style={{ flex:.5 }}>
                <Image source={{ uri:item.imageURL }} style={{ width:150,height:150,borderRadius:10 }} />
            </View>
            <View style={{ marginHorizontal:10,flex:.5 }}>
                <Text style={{ color:'white',fontSize:14 }}>{item.title}</Text>
                {/* <Text style={{ color:'#4D4639',fontSize:12 }}>2.8M Views 3 Months Ago</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      );
  }
  search = ({item}) => {
    return (
      <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10 }} onPress={()=>{this.props.navigation.navigate('Player',{id:item.id})}}>
        <Image source={{ uri:item.image }} style={{ width:100,height:100,borderRadius:10 }} />
        <Text style={{ color:'white',fontSize:14 }}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  onPressSearch =async () => {
    await this.setState({searching:!this.state.searching});
    //  this.searchInput.focus();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.searching?
          <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flex:1,backgroundColor:'black',height:120,paddingTop:20,paddingLeft:20 }}>
            <TouchableOpacity style={{ paddingHorizontal:10 }} onPress={()=>{this.setState({searching:!this.state.searching,searchString:''})}}>
              <Icon
                    name='arrow-left'
                    type='feather'
                    color='white'
                    size={30}
              />
            </TouchableOpacity>
            <View style={styles.searchSection}>
                <Icon
                  name='search'
                  type='feather'
                  color='white'
                  containerStyle={{ paddingHorizontal: 10 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    ref={(ref)=>{this.searchInput=ref;}}
                    onChangeText={(searchString) => {this.searched(searchString)}}
                    underlineColorAndroid="transparent"
                />
            </View>
            </View>
             :
             <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,backgroundColor:'black',height:120,paddingTop:20,paddingLeft:20 }}>
             <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
               <Image source={ require('../assets/logo.png') } style={{width:45,height:45,marginHorizontal:10}}/>
               <Text style={{ color:'white',fontSize:18 }}>Productions</Text>
             </View>
             <TouchableOpacity style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:'#161617',padding:10,borderRadius:50,marginHorizontal:10}} onPress={()=>{this.onPressSearch()}}>
               <Image source={ require('../assets/search.png') } style={{width:25,height:25}}/>
             </TouchableOpacity>
           </View>
        }
        <TouchableOpacity style={{ paddingLeft:20,paddingTop:20 }} onPress={() => this.props.navigation.goBack()}>
                <Image source={ require('../assets/back.png') } style={{width:30,height:25,marginHorizontal:10}}/>
        </TouchableOpacity>
        {this.state.searchString==''?
        <View>
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
          data={this.state.videos}
          renderItem={(item) => this.popular_videos(item)}
          keyExtractor={(item, index) => index}
        />
      </View>
      </View>
      :<View style={{ paddingTop:20,paddingLeft:20 }}>
      {this.state.searchdata.map((item,index)=>(
        // <View style={{alignItems:'center',paddingTop:30}}>
        //   <Text style={{color:'white',fontSize:20}}>{this.state.SearchDataLength}</Text>
        // </View>
        <View style={{ flex:1}}>
          <View style={{ flex:1,flexDirection:'row',alignItems:'center' }}>
            <View style={{ marginHorizontal:10,marginVertical:10,flex:item.name.length<=4?.2:item.name.length<=8?.35:.2 }}>
              <Text style={{ color:'white',fontSize:22 }}>{item.name}</Text>
            </View>
            <View style={{ marginVertical:10,marginRight:20,flex:item.name.length<=4?.8:item.name.length<=8?.75:.8 }}>
              <Line />
            </View>
          </View>
          <View style={{ marginVertical:10 }}>
              <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={item.Tracks}
              renderItem={(item) => this.popular_videos(item)}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      ))
      }
  </View>}
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
  },
  searchSection: {
    flex: .9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    backgroundColor: '#161617',
  },
  searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#161617',
      borderRadius:50,
      color: 'white',
  },
});
export default HomeScreen;
