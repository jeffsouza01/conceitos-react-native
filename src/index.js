import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);


    async function handleNewProject () {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'Jefferson da Silva'
        });

        let project = response.data;

        setProjects([...projects, project]);

    }

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

            < TouchableOpacity 
                activeOpacity={0.6}
                style={styles.button} 
                onPress={handleNewProject}>
                    < Text style={styles.textButton}> Adicionar Projeto </Text>
            </TouchableOpacity>


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
    },

    button: {
        backgroundColor: '#fff',
        borderRadius: 6,
        height: 50,
        margin: 15,
        alignItems: "center",
        justifyContent: 'center'

    },

    textButton: {
        fontWeight: 'bold'
    }
});