import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useTasksApi } from '../hooks/UseAxios';
import { appContext } from '../context/appContext';
import { Icon, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../helpers/getImages';
import { darker, lighter } from '../helpers/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const LoginScreen = ({ navigation }) => {


    const { newUser, onLogin } = useTasksApi()
    const { login } = useContext(appContext)
    const [visible, setVisible] = useState(false)
    const [keyboardActive, setKeyboardActive] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = () => {
        onLogin(username, password, login, navigation, setUsername, setPassword)
    };

    //user@taskify.com

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardActive(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardActive(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (


        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1
            }}
            enabled={keyboardActive}
        >
            <SafeAreaView
                style={{
                    backgroundColor: '#e9efff',
                    flex: 1, display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-start', flexDirection: 'column',
                    position: 'relative'

                }}>
                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                    flexDirection: 'row', width: '80%', marginTop: 120
                }}>

                    <Image
                        style={{
                            height: 40,
                            width: 40,
                            marginTop: 5
                        }}
                        source={images.logo}
                    />

                    <View style={{
                        height: 40, borderRightWidth: 2.5,
                        borderRightColor: darker('#708AD6', 0.8)
                    }} />

                    <Image
                        style={{
                            height: 45,
                            width: 170,
                            marginTop: 5
                        }}
                        source={images.text}
                    />

                </View>

                <View style={{
                    width: '65%', borderBottomWidth: 2,
                    borderBottomColor: '#708AD6', height: 1,
                    marginVertical: 35
                }} />

                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                    flexDirection: 'column', width: '80%'
                }}>
                    <TextInput
                        placeholder='Username'
                        inputMode='email'
                        keyboardType='email-address'
                        value={username}
                        onChange={(event) => setUsername(event.nativeEvent.text.toLowerCase())}
                        style={[{ marginBottom: 10, width: '90%' }, styles.inputText]} />


                    <View style={[{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'row', width: '90%'
                    }, styles.inputText]}>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={!visible}
                            value={password}
                            onChange={(event) => setPassword(event.nativeEvent.text)}
                            style={{ width: '95%', textAlignVertical: 'center' }}
                        />
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Icon
                                source={!visible ? "eye-off" : "eye"}
                                color={`${darker('#708AD6', 0.8)}99`}
                                style={{ position: 'absolute', right: 1 }}
                                size={20}
                            />
                        </TouchableOpacity>

                    </View>





                </View>

                <Button
                    textColor={lighter('#708AD6', 0.9)}
                    onPress={() => onFinish()}
                    labelStyle={{
                        fontWeight: 700
                    }}
                    style={{
                        backgroundColor: '#708AD6',
                        width: '70%', height: 40, marginTop: 35,
                        fontWeight: 800
                    }}
                >Login</Button>



                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row',
                    // position: 'absolute', bottom: 100
                    marginTop: 35
                    // width: '75%'
                }}>
                    <Text style={{
                        marginRight: 5, color: `${darker('#708AD6', 0.3)}99`,
                        fontWeight: 400, fontSize: 15
                    }}>Don't you have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('new_user')}>
                        <Text style={{
                            color: `${darker('#708AD6', 0.9)}99`,
                            fontWeight: 800, fontSize: 15
                        }}>Sign up</Text>
                    </TouchableOpacity>

                </View>

                {/* <Button
                onPress={() => onFinish()}
                title='Go to home'
            /> */}
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
};

export const styles = StyleSheet.create({
    inputText: {
        borderColor: darker('#e9efff', 0.9), borderWidth: 1,
        paddingTop: '3%', paddingBottom: '3%', paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 50, backgroundColor: lighter('#e9efff', 0.9)
    },
});

