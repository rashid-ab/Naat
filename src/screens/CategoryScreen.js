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
import axios from 'axios';
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AppStyles,
} from "../AppStyles";
import Line from '../components/Line';
import {Icon} from 'react-native-elements'
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      index: 0,
      searchString:'',
      searching:false,
      data:[],
      searchdata:[
            {title:'Naaaaaat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]},
            {title:'Naat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]},
            {title:'Naat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]},
            {title:'Naat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]},
            {title:'Naat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]},
            {title:'Naat',data:[{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'},{image:'https://grlzradio.files.wordpress.com/2019/12/city-skyline-40-night.jpg',title:'Hedriem'}]}
      ]
    };
  }
  componentDidMount = async() => {
    // await AsyncStorage.setItem({"url":"http://staging.shafiquesons.com/"})
    axios({
      method: 'get',
      url: 'http://Sh.tasmiasolutions.com/api/mobile/get_all_categories',
      // responseType: 'stream'
    })
      .then(({ data: response }) => {
        console.log(response.data)
        this.setState({data:response.data,visible:false})
    });
  }
  _renderItem = ({item, index}) => {
    return (
      // <View style={{ borderRadius:20 }}>
      //   <TouchableOpacity >
      //     <ImageBackground style={styles.itemContainer} source={{ uri:item.image }} style={{ width:150,height:150,marginRight:20,borderRadius:20,marginVertical:10 }}>
      //       <View style={{ flex:.7,justifyContent:'center',alignItems:'center',paddingTop:38 }}>
      //       </View>
      //       <View style={{ flex:.3,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,.6)' }}>
      //         <Text style={{ fontSize:18,color:'white' }}>{ item.title }</Text>
      //       </View>
      //     </ImageBackground>
      //   </TouchableOpacity>
      // </View>
      <TouchableOpacity style={{ }} onPress={()=>{this.props.navigation.navigate('Item',{id:item.id})}}>
          <Image source={{ uri:item.imageURL }} style={{ width:150,zIndex:0,height:150,marginRight:20,borderRadius:20,marginVertical:10 }}/>
          {/* <Text style={{ color:'white',fontSize:14,zIndex:1000,position:'absolute',bottom:20 }}>{item.title}</Text> */}
          <View style={{ justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,.6)',zIndex:1000,bottom:40,width:150,height:30,borderBottomLeftRadius:20,borderBottomRightRadius:20 }}>
            <Text style={{ fontSize:14,color:'white' }}>{ item.name }</Text>
          </View>
      </TouchableOpacity>
    );
  }
  popular_videos = ({item}) => {
    return (
      <TouchableOpacity style={{ borderRadius:10,marginHorizontal:10 }} onPress={()=>{this.props.navigation.navigate('Player',{id:item.id})}}>
        <Image source={{ uri:item.imageURL }} style={{ width:100,height:100,borderRadius:10 }} />
        <Text style={{ color:'white',fontSize:14 }}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  onRadioPressed() {
      console.log('asaaaa')
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
        <TouchableOpacity style={{ paddingLeft:20,paddingTop:20 }} onPress={() => this.props.navigation.goBack()}>
                <Image source={ require('../assets/back.png') } style={{width:30,height:25,marginHorizontal:10}}/>
        </TouchableOpacity>
        {this.state.searchString==''?
        <View>
        <View style={{ paddingTop:20,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:35 }}>Categories</Text>
        </View>
      <View style={{ paddingTop:20,paddingLeft:30 }}>
          <Text style={{ color:'white',fontSize:20,paddingTop:10 }}>All Categories</Text>
      </View>
      <View style={{ paddingLeft:20,paddingVertical:20 }}>
        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={(item) => this._renderItem(item)}
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
