import { View, Text , Image} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Features() {
  return (
    <View style={{height: hp(60)}} className="space-y-8">
        {/* Chat GPT */}
      <View className="bg-gray-400 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-2">
            <Image source={require('../../assets/images/chatgptIcon.png')} style={{width: hp(4), height: hp(4)}} />
            <Text style={{fontSize: wp(5)}} className="font-semibold text-white">Chat GPT</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="font-medium text-white">
        ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
        </Text>
      </View>
      {/*Dall - E */}
      <View className="bg-gray-400 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-2">
            <Image source={require('../../assets/images/dalleIcon.png')} style={{width: hp(4), height: hp(4)}} />
            <Text style={{fontSize: wp(5)}} className="font-semibold text-white">Dall-e</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="font-medium text-white">
        DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      {/* Smart AI */}
      <View className="bg-gray-400 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-2">
            <Image source={require('../../assets/images/smartaiIcon.png')} style={{width: hp(4), height: hp(4)}} />
            <Text style={{fontSize: wp(5)}} className="font-semibold text-white">Smart AI</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="font-medium text-white">
        A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.
        </Text>
      </View>
    </View>
  )
}