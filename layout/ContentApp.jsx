import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SegmentedButtons } from 'react-native-paper';
import { lighter } from '../helpers/functions';
import { CustomTask } from '../components/CustomTask';
import { useTasksApi } from '../hooks/UseAxios';
import { appContext } from '../context/appContext';

export const ContentApp = () => {

    const { newtask, getTasks } = useTasksApi()
    const [newTask, setNewTask] = useState('')
    const { user, myTasks, setMyTasks, currentTask } = useContext(appContext)
    const [taskState, setTaskState] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState(myTasks)
    const [selectedList, setSelectedList] = useState('tasks')

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

        if (myTasks) {
            switch (selectedList) {
                case 'tasks':
                    const unFinishedTasks = myTasks.filter(task => !task.finished)
                    setFilteredTasks(unFinishedTasks)
                    break;

                case 'finish':
                    const completedTasks = myTasks.filter(task => task.finished)
                    setFilteredTasks(completedTasks)
                    break;

                case 'favs':
                    const favTasks = myTasks.filter(task => task.favorite && !task.finished)
                    setFilteredTasks(favTasks)
                    break;

                default:
                    break;
            }
        }

    }, [selectedList, myTasks])

    useEffect(() => {
        getTasks(user, setMyTasks)
    }, [])

    return (

        <>
            <View style={{
                backgroundColor: '#e9efff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <SegmentedButtons
                    value={selectedList}
                    onValueChange={setSelectedList}
                    style={{
                        marginTop: 15,
                        width: '92%',

                    }}

                    buttons={[
                        {
                            value: 'tasks',
                            label: 'Tasks',
                            // checkedColor: '#e9efff',
                            style: {
                                borderColor: '#2e3c5920',
                                backgroundColor:
                                    selectedList === 'tasks' ? `${lighter('#2e3c59', 0.1)}60`
                                        : 'transparent',
                            },
                        },
                        {
                            value: 'favs',
                            label: 'Favorites',
                            style: {
                                borderColor: '#2e3c5920',
                                backgroundColor:
                                    selectedList === 'favs' ? `${lighter('#2e3c59', 0.1)}60`
                                        : 'transparent',
                            },
                        },
                        {
                            value: 'finish',
                            label: 'Finished',
                            style: {
                                borderColor: '#2e3c5920',
                                backgroundColor:
                                    selectedList === 'finish' ? `${lighter('#2e3c59', 0.1)}60`
                                        : 'transparent',
                            },
                        },
                    ]}
                />

                <View style={styles.horizontalRule} />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                style={{
                    flex: 1, backgroundColor: '#e9efff'
                }}>


                <CustomTask data={filteredTasks} setTaskState={setTaskState} />
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-start', flexDirection: 'column'
    },
    horizontalRule: {
        borderBottomColor: `${lighter('#2e3c59', 0.1)}20`, // Puedes cambiar el color de la línea
        borderBottomWidth: 4,
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',   // Puedes ajustar el grosor de la línea
        marginVertical: 15,
        width: '90%'        // Puedes ajustar el espaciado vertical
    },
});
