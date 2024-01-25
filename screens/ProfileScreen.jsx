import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTasksApi } from '../hooks/UseAxios';
import { appContext } from '../context/appContext';
import { Avatar, Icon, Button, IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectAvatar } from '../helpers/getImages';
import { TaskCounter, lighter } from '../helpers/functions';

export const ProfileScreen = ({ navigation }) => {


    const { newUser, onLogin } = useTasksApi()
    const { login, user, myTasks } = useContext(appContext)

    const onFinish = () => {
        onLogin('user@taskify.com', '1234', login, navigation)
    };

    return (
        <SafeAreaView style={[{
            backgroundColor: '#2E3B59',
            flex: 1, position: 'relative'
        }, styles.container]}>

            <IconButton
                icon="keyboard-return"
                iconColor={lighter('#2E3B59', 0.4)}
                size={30}
                onPress={() => navigation.navigate('home')}
                style={{
                    position: 'absolute', right: 15, top: 80
                }}
            />

            <Avatar.Image

                size={150} source={selectAvatar(user.avatar)}
                style={[{
                    marginTop: 70

                }]}
            />

            <Text style={[{
                marginTop: 45, fontSize: 35,
                marginBottom: 20,
                color: lighter('#2E3B59', 0.8)
            }]}>Hi {user.name}!</Text>

            {/* <View style={[styles.horizontalRule, { width: '70%' }]} /> */}

            <View style={[{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', width: '70%',
            },]}>
                <View style={[{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                    flexDirection: 'row', width: '100%',
                    padding: '5%'
                },]}>
                    <Icon
                        source="email"
                        color={lighter('#2E3B59', 0.8)}
                        size={30}
                    />

                    <Text style={{
                        color: lighter('#2E3B59', 0.8),
                        fontSize: 20
                    }}>{user.username}</Text>
                    {/* <Text style={{

                        color: lighter('#2E3B59', 0.8),
                        fontSize: 20, fontWeight: 900

                    }}>{TaskCounter(myTasks)}</Text> */}

                </View>

                <View style={[{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                    flexDirection: 'row', width: '100%',
                    padding: '5%'
                },]}>
                    <Icon
                        source="check-all"
                        color={lighter('#2E3B59', 0.8)}
                        size={30}
                    />

                    <Text style={{
                        color: lighter('#2E3B59', 0.8),
                        fontSize: 20
                    }}>Tasks finished</Text>
                    <Text style={{

                        color: lighter('#2E3B59', 0.8),
                        fontSize: 20, fontWeight: 900

                    }}>{TaskCounter(myTasks)}</Text>

                </View>
            </View>

            <Button
                icon='logout'
                textColor='#2E3B59'

                onPress={() => navigation.navigate('login')}

                style={{
                    backgroundColor: lighter('#2E3B59', 0.8),
                    bottom: 100, width: 160, height: 40,
                    position: 'absolute'

                }}
            >Logout</Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-start', flexDirection: 'column'
    },
    horizontalRule: {
        borderBottomColor: `${lighter('#2e3c59', 0.8)}20`, // Puedes cambiar el color de la línea
        borderBottomWidth: 2,
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',   // Puedes ajustar el grosor de la línea
        marginVertical: 15,
        // Puedes ajustar el espaciado vertical
    },
    row: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row'
    }
});
