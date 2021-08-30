import * as React from 'react';
import { Text, TextInput, View, Button,Image ,StyleSheet,TouchableHighlight,Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sheet from 'react-native-raw-bottom-sheet';
import EditPicture from './components/edit_pic';
import Details from './components/get_details';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import ProgressBar from './components/ProgressBar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        project: {
          merge: true,
        },
      },
    },
  },
});
function HomeScreen({navigation,route}){
  const [imageUri,setImageUri]=React.useState('');
  const [Id,setId]=React.useState(1);
  let def_img=require('./images/img.png');
  const refSheet=React.useRef();
  if(route.params.click){
    return(
      <View style={[styles.container]}>
        <TouchableHighlight style={{
            height:180,
            width:180,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 90,
            borderWidth:route.params.wid,
            borderColor:route.params.color
          }}
          onPress={()=>navigation.navigate('Story',{
            content:route.params.post,
          })}
          onLongPress={()=>refSheet.current.open()}
        >
          <View >
            {imageUri == '' ? (
              <Image style={{width:167,height:167,borderRadius:90}} source={def_img} />
            ) : (
              <Image style={{width:167,height:167,borderRadius:90}} source={{uri: imageUri}} />
            )}
          </View>
        </TouchableHighlight>
        <Sheet
          ref={refSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          animationType="fade"
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <EditPicture
            id={Id}
            onResponse={(new_uri) => {
              setImageUri(new_uri);
              refSheet.current.close();
            }}
          />
        </Sheet>
        <Details id={Id} />
      </View>
    );
  }
  else{
    return (
      <View style={[styles.container]}>
      <TouchableHighlight style={{
        height:180,
        width:180,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 90,
        borderWidth:route.params.wid,
        borderColor:route.params.color
      }}
      onLongPress={()=>refSheet.current.open()}
        >
        <View >
          {imageUri == '' ? (
            <Image style={{width:167,height:167,borderRadius:90}} source={def_img} />
          ) : (
            <Image style={{width:167,height:167,borderRadius:90}} source={{uri: imageUri}} />
          )}
        </View>
      </TouchableHighlight>
      <Sheet
          ref={refSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          animationType="fade"
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <EditPicture
            id={Id}
            onResponse={(new_uri) => {
              setImageUri(new_uri);
              refSheet.current.close();
            }}
          />
        </Sheet>
      <Button title="Add Story" onPress={()=>navigation.navigate('CreatePost')} color='#fca311' />
      <Details id={Id} />
    </View>
    );
  }
}
function CreatePostScreen({ navigation}) {
  let news=require('./images/news_pic.jpg');
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="Your Opinion!"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done" 
        onPress= {()=>{
          navigation.navigate('Home',{
            post : postText,
            color:'green',
            wid:7,
            click:true
          })
        }}
      />
      <Image style={{flex:3,width:300,height:30,margin:50,borderRadius:5}} source={news}/>
    </>
  );
}

function StoryScreen({navigation,route}){
  let news=require('./images/news_pic.jpg');
  setTimeout(()=>{
    navigation.navigate('Home',{color:'grey',wid:7,click:true})
  },5000);
  return(
    <View style={{flex:1}}>
       <ProgressBar />
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{ margin: 10,flex:1,fontSize:50,color: '#fca311' }}>{route.params.content}</Text>
    </View>
    <Image style={{flex:3,width:300,height:30,margin:50,borderRadius:5}} source={news}/>
    </View>
  );
}

const Stack=createStackNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} initialParams={{color:'orange',wid:0,click:false}} />
          <Stack.Screen name='CreatePost' component={CreatePostScreen} />
          <Stack.Screen name='Story' component={StoryScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
});
