import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AppStyles,
} from "../AppStyles";
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
          <Image source={{ uri:item.image }} style={{ width:150,zIndex:0,height:150,marginRight:20,borderRadius:20,marginVertical:10 }}/>
          {/* <Text style={{ color:'white',fontSize:14,zIndex:1000,position:'absolute',bottom:20 }}>{item.title}</Text> */}
          <View style={{ justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,.6)',zIndex:1000,bottom:40,width:150,height:30,borderBottomLeftRadius:20,borderBottomRightRadius:20 }}>
            <Text style={{ fontSize:14,color:'white' }}>{ item.title }</Text>
          </View>
      </TouchableOpacity>
    );
  }
  onRadioPressed() {
      console.log('asaaaa')
  }
componentDidMount = () => {
  console.log('asaaasasasasaa')
}
  render() {
    return (
      <ScrollView style={styles.container}>
          
        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,backgroundColor:'black',height:120,paddingTop:20,paddingLeft:20 }}>
          <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={ require('../assets/logo.png') } style={{width:45,height:45,marginHorizontal:10}}/>
            <Text style={{ color:'white',fontSize:18 }}>Productions</Text>
          </View>
          <TouchableOpacity  style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:'#161617',padding:10,borderRadius:50,marginHorizontal:10}} >
            <Image source={ require('../assets/search.png') } style={{width:25,height:25}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ paddingLeft:20,paddingTop:20 }} onPress={() => this.props.navigation.goBack()}>
                <Image source={ require('../assets/back.png') } style={{width:30,height:25,marginHorizontal:10}}/>
        </TouchableOpacity>
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
