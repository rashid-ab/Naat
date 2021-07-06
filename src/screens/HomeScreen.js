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
  TextInput,
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from 'react-native-snap-carousel';
import {
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import { scrollInterpolator, animatedStyles } from '../components/utils';
import {Icon} from 'react-native-elements'
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Dimensions.get('window').width > Dimensions.get('window').height? Math.round(ITEM_WIDTH * 3 / 2):Math.round(ITEM_WIDTH * 3 / 4);
import Line from '../components/Line';
import axios from 'axios';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      index: 0,
      searchString:'',
      searching:false,
      data:[],
      popular_videos:[],
      popular_categories:[],
      searchdata:[],
      isLoading:true
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
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_popular_catgeories',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        this.setState({popular_categories:response.data,isLoading:false})
    });
    axios({
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_popular_videos',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        this.setState({popular_videos:response.data,visible:false})
    });
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
        <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10 }} onPress={()=>{this.props.navigation.navigate('Player',{data:{youtubeID:item.youtubeID,category_id:item.categoryID,title:item.title}})}}>
          <Image source={{ uri:item.imageURL }} style={{ width:100,height:100,borderRadius:10 }} />
          <Text style={{ color:'white',fontSize:14 }}>{item.title}</Text>
        </TouchableOpacity>
      );
  }
  popular_categories = ({item}) => {
    return (
      <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10 }} onPress={()=>{this.props.navigation.navigate('Item',{id:item.id})}}>
        <Image source={{ uri:item.imageURL }} style={{ width:100,height:100,borderRadius:10 }} />
        <Text style={{ color:'white',fontSize:14 }}>{item.name}</Text>
      </TouchableOpacity>
    );
}
  searched = (text) => {
    axios({
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/search_videos/'+text,
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        console.log(response.data)
        this.setState({searchdata:response.data,visible:false,searchString:text})
    });
    // this.setState({searching:!this.state.searching,searchString:text})

  }
  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
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
             <TouchableOpacity style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:'#161617',padding:10,borderRadius:50,marginHorizontal:10}} onPress={()=>{this.setState({searching:!this.state.searching})}}>
               <Image source={ require('../assets/search.png') } style={{width:25,height:25}}/>
             </TouchableOpacity>
           </View>
        }
        {this.state.searchString==''?
        this.state.isLoading?
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           <ActivityIndicator size='large' color="#C0AE4A" />
        </View>
        :
        <View>
        <View style={{ paddingTop:40,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:35 }}>Home</Text>
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
      </View>
      <View style={{ paddingTop:20,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:20,paddingTop:10 }}>Popular Videos</Text>
      </View>
      <View style={{ paddingLeft:20,paddingVertical:20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.state.popular_videos}
          renderItem={(item) => this.popular_videos(item)}
          keyExtractor={(item, index) => index}
        />
      </View>
      <View style={{ paddingTop:20,paddingLeft:30,flex:1,flexDirection:'row',justifyContent:'space-between' }}>
          <Text style={{ color:'white',fontSize:20,paddingTop:10 }}>Popular Category</Text>
          <TouchableOpacity style={{ flexDirection:'row',justifyContent:'center',alignItems:'center' }} onPress={()=>{this.props.navigation.navigate('Category')}}>
            <Text style={{ color:'white',fontSize:16,paddingTop:10 }}>See All</Text>
            <Image source={ require('../assets/see.png') } style={{width:10,height:10,marginHorizontal:10,marginTop:10}}/>
          </TouchableOpacity>
      </View>
      <View style={{ paddingLeft:20,paddingVertical:20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.state.popular_categories}
          renderItem={(item) => this.popular_categories(item)}
          keyExtractor={(item, index) => index}
        />
      </View>
      </View>
      :<View style={{ paddingTop:20,paddingLeft:20 }}>
          {this.state.searchdata.map((item,index)=>(
            this.state.searchdata.length==0?
            <View style={{alignItems:'center',paddingTop:130}}>
              <Text style={{color:'white',fontSize:20}}>No Data Found</Text>
            </View>
            :<View style={{ flex:1}}>
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
    width: "100%",
    height: 200,
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
