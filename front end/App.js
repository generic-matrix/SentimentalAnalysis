import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet,View,TextInput,Text} from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [label, SetLabel] = useState('');

  const HOST = "http://192.168.43.245:5001"

  async function GetSentiment() {
      return new Promise(async(resolve, reject) => {
          if(text.length<1){
            reject("Invalid Text");
          }
          const response = await fetch(HOST+'/sentiment?query='+btoa(text), {
          method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          });
          response.json().then((res)=>{
              resolve(res)
          }).catch((error)=>{
              reject(error)
          })
      });
  }
  return (
    <View style={styles.container}>
       <TextInput
        style={{height: 40,alignSelf: 'stretch',textAlign: 'center'}}
        placeholder="Type here to see how the text sounds :)"
        onChangeText={newText => 
        {
          setText(newText)
          GetSentiment().then((result)=>{
            SetLabel((result[0].label==="NEGATIVE")?"😔":"😊")
          }).catch((error)=>{
            console.log(error)
          })
        }}
        defaultValue={text}
      />
      <StatusBar style="auto" />
      <br/>
      <Text style={{fontSize:50}}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
