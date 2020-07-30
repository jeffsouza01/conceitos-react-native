import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    return (
        <>
        < StatusBar backgroundColor='#7159c1' barStyle="light-content" ></StatusBar>
    
        <SafeAreaView style={styles.container}> 

            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({item:project}) => (
                    < Text style={styles.title} > {project.title} </Text>
                    )}
                    />
        </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});