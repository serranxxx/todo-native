import React, { useContext } from 'react'
import { Image, View, Text, Button, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { images, selectAvatar } from '../helpers/getImages';
import { appContext } from '../context/appContext';


export const HeaderApp = ({ navigation }) => {

    const { user } = useContext(appContext)

    return (
        <View
            style={{
                position: 'fixed', zIndex: 1, width: '100%',
                backgroundColor: `#2e3c59`, display: 'flex',
                height: 60, alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'row', position: 'relative'
                // shadowColor: 'black', // Para sombra en dispositivos iOS
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.4,
                // shadowRadius: 8,
            }}>
            <TouchableOpacity
                style={{ position: 'absolute', left: 20, top: 0 }}
                onPress={() => navigation.navigate('profile')}>
                <Avatar.Image

                    size={45} source={selectAvatar(user.avatar)}
                    style={{
                        backgroundColor: 'transparent',

                    }}
                />
            </TouchableOpacity>


            <Image
                style={{
                    height: 30,
                    width: 120,
                    marginTop: 5
                }}
                source={images.text_light}
            />

            {/* <SvgUri width="200" height="200" source={require('../assets/SVG/logo.svg')} /> */}


        </View>
    )
}
