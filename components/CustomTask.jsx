import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton, MD3Colors } from 'react-native-paper';
import { useTasksApi } from '../hooks/UseAxios';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { lighter } from '../helpers/functions';

export const CustomTask = ({
    data, setTaskState
}) => {

    const { editTask, deleteTask } = useTasksApi()

    const handleFinished = (_id) => {

        const taskSelected = data.find(task => task.id === _id)
        if (taskSelected) {
            taskSelected.finished = !taskSelected.finished
            editTask(taskSelected, setTaskState)
        }
    }

    const handleFavorite = (_id) => {

        const taskSelected = data.find(task => task.id === _id)
        if (taskSelected) {
            taskSelected.favorite = !taskSelected.favorite
            editTask(taskSelected, setTaskState)
        }
    }

    const renderRightActions = (_id) => (
        <View style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 15
        }}>
            <TouchableOpacity
                icon="trash-can-outline"
                style={{
                    backgroundColor: lighter('#D86B6B', 0.2),
                    // borderWidth: 3,
                    height: '100%', borderRadius: 50, width: 50, marginRight: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onPress={() => deleteTask(_id, setTaskState)}
            >
                <IconButton
                    icon={"trash-can-outline"}
                    iconColor={'#E9EFFF'}
                    size={25}
                    style={[{
                        borderColor: '#2E3C59', borderWidth: 0,
                        backgroundColor: 'transparent'
                    }, styles.center]}
                // onPress={() => handleFinished(task.id)}
                />
            </TouchableOpacity>
        </View>
    );

    const renderLeftActions = (_id) => (
        <View style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 15
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: lighter('#2e3c59', 0.4),
                    // borderWidth: 3,
                    height: '100%', borderRadius: 50, width: 50, marginRight: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onPress={() => console.log('delete')}
            >
                <IconButton
                    icon={"information"}
                    iconColor={'#E9EFFF'}
                    size={25}
                    style={[{
                        borderColor: '#2E3C59', borderWidth: 0,
                        backgroundColor: 'transparent'
                    }, styles.center]}
                // onPress={() => handleFinished(task.id)}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            {
                data ?
                    data.length > 0 ?
                        data.slice().reverse().map((task => (
                            <Swipeable key={task.id}
                                renderRightActions={() => renderRightActions(task.id)}
                            // renderLeftActions={() => renderLeftActions(task.id)}

                            >
                                <View style={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{
                                        width: '95%', height: 'auto', marginBottom: 15,
                                        padding: '2% 1% 2% 1%',
                                        alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
                                        backgroundColor: '#dce4f799',
                                        borderTopEndRadius: '40%', borderTopStartRadius: '40%',
                                        borderBottomEndRadius: '40%', borderBottomStartRadius: '40%',
                                    }}>

                                        <IconButton
                                            icon={!task.finished ? "check-bold" : "check-all"}
                                            iconColor={'#E9EFFF'}
                                            size={15}
                                            style={[{
                                                borderColor: '#2E3C59', borderWidth: 0,
                                                backgroundColor: task.finished ? '#2E3C59' : '#2E3C5930'
                                            }, styles.center]}
                                            onPress={() => handleFinished(task.id)}
                                        />

                                        <Text style={{
                                            width: '70%', textAlign: 'left',
                                            marginLeft: 15,
                                            // textDecorationLine: task.finished ? 'line-through' : ''
                                            // textDecoration: task.finished ? 'line-through' : ''
                                        }}>{task.name}</Text>

                                        <IconButton
                                            icon={task.favorite ? "star" : "star-outline"}
                                            iconColor={task.favorite ? '#2E3C59' : '#2E3C5960'}
                                            size={25}
                                            style={[{
                                                borderColor: '#2E3C59', borderWidth: 0,
                                                backgroundColor: 'transparent'
                                            }, styles.center]}
                                            onPress={() => handleFavorite(task.id)}
                                        />
                                    </View>
                                </View>

                            </Swipeable>
                        )))
                        : <Text style={{
                            fontWeight: 700,
                            opacity: 0.5
                        }}>You don't have any task yet</Text>
                    : <></>
            }
        </>

    )
}




const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
