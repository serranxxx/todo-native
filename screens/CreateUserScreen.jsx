import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useTasksApi } from '../hooks/UseAxios';
import { appContext } from '../context/appContext';
import { Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { avatars, images } from '../helpers/getImages';
import { darker, lighter } from '../helpers/functions';
import { Button } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export const CreateUSerScreen = ({ navigation }) => {


    const { newUser, onLogin } = useTasksApi()
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [selectedAvatar, setSelectedAvatar] = useState(1)

    const onNewUser = () => {
        newUser(email, password, Name, selectedAvatar, lastname, navigation)
    }

    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: '#e9efff',
                flex: 1, display: 'flex', alignItems: 'center',
                justifyContent: 'flex-start', flexDirection: 'column',
                position: 'relative', paddingBottom: '10%'
            }}>
            <View style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                flexDirection: 'row', width: '80%', marginTop: 80
            }}>

                <Image
                    style={{
                        height: 50,
                        width: 50,
                        marginTop: 5
                    }}
                    source={images.logo}
                />

                <View style={{
                    height: 40, borderRightWidth: 3,
                    borderRightColor: darker('#708AD6', 0.8)
                }} />

                <Image
                    style={{
                        height: 50,
                        width: 180,
                        marginTop: 5
                    }}
                    source={images.text}
                />

            </View>
            <View style={{
                width: '65%', borderBottomWidth: 2,
                borderBottomColor: '#708AD6', height: 1,
                marginTop: 35,
                marginVertical: 10
            }} />



            <View style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                flexDirection: 'column', width: '85%', height: 'auto'
            }}>
                <Text style={{
                    width: '100%', textAlign: 'left',
                    marginLeft: 15, fontSize: 20, fontWeight: 700,
                    marginVertical: 15, color: darker('#708AD6', 0.8)
                }}>Sing up</Text>

                <TextInput
                    placeholder='Name'
                    value={Name}
                    onChange={(event) => setName(event.nativeEvent.text)}
                    style={[styles.inputText, { width: '100%', color: darker('#708AD6', 0.5) }]} />
                <TextInput
                    placeholder='Last name'
                    value={lastname}
                    onChange={(event) => setLastname(event.nativeEvent.text)}
                    style={[styles.inputText, { width: '100%', marginVertical: 10, color: darker('#708AD6', 0.5) }]} />

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChange={(event) => setEmail(event.nativeEvent.text.toLowerCase())}
                    style={[styles.inputText, { width: '100%', color: darker('#708AD6', 0.5) }]} />


                <View style={[styles.inputText, {
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', flexDirection: 'row',
                    marginVertical: 10

                }]}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={!visible}
                        value={password}
                        onChange={(event) => setPassword(event.nativeEvent.text)}
                        style={[{ width: '95%', color: darker('#708AD6', 0.5) }]} />

                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <Icon
                            source={!visible ? "eye-off" : "eye"}
                            color={`${darker('#708AD6', 0.8)}80`}
                            style={{}}
                            size={20}
                        />
                    </TouchableOpacity>

                </View>

                <Text style={{
                    width: '100%', textAlign: 'left',
                    marginLeft: 15, fontSize: 15, fontWeight: 500,
                    marginVertical: 15, color: `${darker('#708AD6', 0.5)}80`
                }}>Select an avatar</Text>

                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                    flexDirection: 'row', flexWrap: 'wrap'
                }}>
                    {
                        avatars.map((avatar) => (

                            <TouchableOpacity onPress={() => setSelectedAvatar(avatar.value)}>
                                <Image
                                    style={{
                                        // Asegura que la imagen se expanda para cubrir todo el espacio disponible en el botón
                                        width: 90,
                                        height: 90,
                                        marginBottom: 10, borderRadius: 20,
                                        borderWidth: 4,
                                        borderColor: selectedAvatar === avatar.value ? '#708AD6' : 'transparent'
                                    }}
                                    source={avatar.image}
                                />
                            </TouchableOpacity>

                        ))
                    }

                </View>

                <View style={{
                    width: '65%', borderBottomWidth: 2,
                    borderBottomColor: '#708AD6', height: 1,
                    marginVertical: 20
                }} />

                <Button
                    textColor={lighter('#708AD6', 0.9)}
                    onPress={() => onNewUser()}
                    labelStyle={{
                        fontWeight: 800
                    }}
                    style={{
                        backgroundColor: '#708AD6',
                        width: '90%', height: 40,
                        fontWeight: 800
                    }}
                >Sing up</Button>



            </View>

            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={{
                    color: `${darker('#708AD6', 0.9)}80`,
                    fontWeight: 700, marginTop: 20
                }}>I have an account already</Text>
            </TouchableOpacity>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    inputText: {
        borderColor: darker('#e9efff', 0.9), borderWidth: 1,
        width: '90%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 50, backgroundColor: lighter('#e9efff', 0.9)
    },
});

