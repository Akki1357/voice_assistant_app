import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/openAI';
import Voice from '@react-native-community/voice';

export default function HomeScreen() {
  const [messages,setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false); 
  const [result, setResult] = useState('');
  
  const clear = () =>{
    setMessages([]);
  }

  const stopSpeaking = () =>{
    setSpeaking(false);
  }

  const speechStartHandler= e =>{
    console.log("speech started");
  }
  const speechEndHandler= e =>{
    setRecording(false);
    console.log("speech ended");
  }
  const speechResultsHandler= e =>{
    console.log("speech result",e);
    const text = e.value[0];
    setResult(text);
  }
  const speechErrorHandler= e =>{
    console.log("speech error",e);
  }

  const startRecording = async() =>{
    setRecording(true);
    try{
      await Voice.start('en-GB');
    }catch(error){
      console.log(error);
    }
  }
  const stopRecording = async() =>{
    try{
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    }catch(error){
      console.log(error);
    }
  }

  const fetchResponse = async ()=>{
    if(result.trim().length>0){
      
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);
      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then(res=>{
        console.log("got respone from API")
        if(res.success){
          setMessages([...res.data]);
          setResult('');
          // now play the response to user
        }else{
          Alert.alert('Error', res.msg);
        }
      })
    }
  }

  useEffect(()=>{
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () =>{
      Voice.destroy().then(Voice.removeAllListeners);
    }
  },[])
  //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
  //console.log('Final Result:',result);
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5 my-2">
        <View className="flex-row justify-center mt-8">
          <Image source={require('../../assets/images/dummy.png')} style={{width: hp(15), height: hp(15)}} />
        </View>

        {/* messeges */}
        {messages.length>0 ? (
          <View className="space-y-2 flex-1">
            <View style={{height: hp(58)}} className="bg-gray-800 rounded-3xl p-4">
              <ScrollView className="space-y-4 " showsVerticalScrollIndicator={false}>
                {
                  messages.map((message,index)=>{
                    if(message.role == 'assistant'){
                      if(message.content.includes('https')){
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View className="p-2 flex rounded-2xl bg-gray-200 rounded-tl-none">
                              <Image
                                source={{uri:message.content}}
                                className="rounded-2xl"
                                resizeMode='cover'
                                style={{width: wp(40), height: wp(40)}}
                              />
                            </View>
                          </View>
                        )
                      }else{
                        return (
                          
                            <View key={index} style={{width: wp(70)}} className="bg-gray-200 rounded-xl p-2 rounded-tl-none">
                              <Text className="text-black">{message.content}</Text>
                            </View>
                          
                        )
                      }
                    }else{
                      return (
                        <View key={index} className="flex-row justify-end">
                          <View style={{width: wp(70)}} className="bg-white rounded-xl p-2 rounded-tr-none">
                            <Text className="text-black">{message.content}</Text>
                          </View>
                        </View>
                      )
                    }
                  })
                }
              </ScrollView>
            </View>
          </View>
        ):(
          <Features/>
        )}
        {/*Recording , Stop , Clear buttons */}
        <View className="flex justify-center items-center">
          { recording? (
            <TouchableOpacity onPress={stopRecording}>
             <Image 
              className="rounded-full"
              source={require('../../assets/images/voiceLoading.gif')}
              style={{height: hp(6), width: hp(6), marginTop: hp(12)}}
             />
            </TouchableOpacity>
          ):(
            <TouchableOpacity onPress={startRecording}>
              <Image 
              className="rounded-full"
              source={require('../../assets/images/micIcon.png')}
              style={{height: hp(6), width: hp(6), marginTop: hp(12)}}
              />
            </TouchableOpacity>
          )}
          {
            messages.length>0 && (
              <TouchableOpacity onPress={clear} className="bg-neutral-400 rounded-3xl absolute right-8 bottom-4">
                <Text className="text-white font-semibold p-2">Clear</Text>
              </TouchableOpacity>
            )
          }

          {
            speaking && (
              <TouchableOpacity onPress={stopSpeaking} className="bg-red-600 rounded-3xl absolute left-10 bottom-4">
                <Text className="text-white font-semibold p-2">Stop</Text>
              </TouchableOpacity>
            )
          }
          
        </View>
      </SafeAreaView>
    </View>
  )
}