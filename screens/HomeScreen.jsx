import React, { useContext } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { appContext } from '../context/appContext';
import { HeaderApp } from '../layout/HeaderApp';
import { ContentApp } from '../layout/ContentApp';
import { FooterApp } from '../layout/FooterApp';

export const HomeScreen = ({ navigation }) => {

    const { isLogged, login, logout, user } = useContext(appContext)
    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#2E3B59',
        }}>
            <HeaderApp navigation={navigation} />
            <ContentApp />
            <FooterApp />

        </SafeAreaView>

    );
};
