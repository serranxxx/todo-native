import React, { useContext, useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { darker, lighter } from '../helpers/functions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useTasksApi } from '../hooks/UseAxios';
import { appContext } from '../context/appContext';
import { generateRandomId } from '../helpers/getRandomId';


export const FooterApp = () => {


    const { newtask, getTasks } = useTasksApi()
    const [newTask, setNewTask] = useState('')
    const [taskState, setTaskState] = useState(false)
    const [keyboardActive, setKeyboardActive] = useState(false);
    const [onWriting, setOnWriting] = useState(false)
    const { user, myTasks, setMyTasks, currentTask } = useContext(appContext)




    const postTask = () => {
        const data = {
            createdBy: user._id,
            name: newTask,
            note: '',
            finished: false,
            creationDate: new Date(),
            favorite: false,
            selected: false,
            id: generateRandomId()
        }
        newtask(data, setTaskState)
        Keyboard.dismiss()
        setNewTask('')
    }

    useEffect(() => {
        if (taskState) {
            getTasks(user, setMyTasks)
            setTaskState(false)
        }
    }, [taskState])

    useEffect(() => {
        setMyTasks(myTasks)
    }, [myTasks])

    useEffect(() => {
        getTasks(user, setMyTasks)
    }, [])

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

    useEffect(() => {
        if (newTask.length > 0) {
            setOnWriting(true)
        } else setOnWriting(false)
    }, [newTask])



    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled={keyboardActive}
        >
            <View
                style={{
                    width: 'auto',
                    backgroundColor: `#2E3B59`,
                    height: 'auto', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row',
                    paddingTop: '3%', paddingBottom: '3%'

                }}>

                <TextInput
                    multiline
                    onChange={(event) => setNewTask(event.nativeEvent.text)}
                    value={newTask}
                    placeholder='What do you have to do? '
                    placeholderTextColor={lighter('#2e3c59', 0.5)}
                    // numberOfLines={3}
                    style={[{
                        backgroundColor: lighter('#2e3c59', 0.1),
                        color: '#FFF', position: 'relative',
                        width: '93%',
                        paddingLeft: '5%', paddingRight: '14%',
                        paddingTop: '3%', paddingBottom: '3%',
                        height: 'auto',
                        textAlignVertical: 'bottom', textAlign: 'justify',
                        borderWidth: 0, borderColor: '#000',


                    }, styles.border]} />

                {
                    onWriting ?
                        <IconButton
                            icon="plus-thick"
                            iconColor={'#2E3C59'}
                            size={20}
                            style={[{
                                borderColor: '#FFF', borderWidth: 0,
                                backgroundColor: '#E9EFFF',
                                position: 'absolute', right: newTask.length > 40 ? 15 : 10
                            }, styles.center]}
                            onPress={postTask}
                        />
                        : <></>
                }


            </View>
        </KeyboardAvoidingView>




    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: lighter('#2e3c59', 0.9),
        // borderRadius: '50%',
        height: 40, width: 40,
        // position: 'absolute', right: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
        // paddingVertical: 15,
        // paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    border: {
        borderWidth: 0, // Ancho del borde
        borderColor: darker('#2e3c59', 0.3), // Color del borde
        borderTopRightRadius: 30, borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30
        // borderRadius: '50%', // Radio de las esquinas
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

});
