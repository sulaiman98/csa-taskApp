import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { URL } from '../constants';

// Date Format Function
const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
};

const HomeScreen = ({ navigation }) => {
    const [optionsVisible, setOptionsVisible] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [currentUserName, setCurrentUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const toggleOptions = (index) => {
        setOptionsVisible((optionsVisible) => (optionsVisible === index ? null : index));
    };

    const renderOptions = (index, task) => {
        if (optionsVisible === index) {
            return (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => navigation.navigate('EditTask', { taskData: task })}
                    >
                        <Text style={styles.optionText}>Edit Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...styles.optionButton, }}
                        onPress={() => handDeleteTask(task.id)}
                    >
                        <Text style={styles.optionText}>Delete Task</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    // Deleting Task Function
    const handDeleteTask = async (taskId) => {
        try {
            // setIsLoading(true);
            const response = await axios.delete(`${URL}/delete-task/${taskId}`);
            console.log('Sucess:', response.data)

            // Rerender the Task Data
            fetchTaskData();
            setIsLoading(false)

            Alert.alert(
                'Deleted', 'Task Deleted Successfully',
                [{ text: 'Okay' }]
            );

        } catch (error) {
            console.log(error.response);

            // Handle error
            Alert.alert(
                'Error', 'Failed to delete task',
                [{ text: 'Okay' }]
            );
        }
    };

    // // Fetch tasks when the component mounts
    // useFocusEffect(() => {
    //     fetchTaskData();
    // }, []);

    // Use useFocusEffect hook to fetch task list every time the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchTaskData();
        }, [])
    );

    const fetchTaskData = async () => {
        try {
            // Retrieve access token from AsyncStorage
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userName = await AsyncStorage.getItem('firstname');
            console.log(accessToken)

            // Make a request to get user tasks with the JWT token in the headers
            const response = await axios.get(`${URL}/user-tasks`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setOptionsVisible(null);
            setCurrentUserName(userName)
            setTasks(response.data.Tasks.reverse());
            setIsLoading(false);

        } catch (error) {
            console.log(error.response)
            // 'Registration Error', err.response.data.message,

            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
            };
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>{`Hi ${currentUserName} !`}</Text>
                    <Text style={styles.subHeaderText}>Have a nice day!</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddTask')}
                >
                    <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.taskSummary}>
                <Text style={styles.boldText}>My Tasks</Text>
                <Text style={styles.taskCount}>{tasks.length}</Text>
            </View>

            {
                // Loader while fetching data
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                ) : (
                    // If No Task is Availabe
                    !tasks.length ?
                        <View style={styles.NoTask}>
                            <Text style={styles.boldText}>No Tasks</Text>
                            <Text style={styles.subHeaderText}>Tap the Add Button to Add Task</Text>
                        </View>
                        :
                        < ScrollView showsVerticalScrollIndicator={false}>
                            {tasks.map((task, index) => (

                                <View
                                    key={index} // Ensure each child has a unique key
                                    style={[
                                        styles.taskItem,
                                        index === tasks.length - 1 && styles.lastChildPadding, // Apply padding to the last child
                                    ]}
                                >
                                    <View style={styles.taskHeaderText}>
                                        <Text style={styles.title}>{task.taskname}</Text>
                                        <Text style={styles.status}>{task.status}</Text>
                                    </View>
                                    <Text style={styles.description}>{task.taskdescription}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.date}> {formatDate(task.startdate)} - {formatDate(task.enddate)} </Text>

                                        <TouchableOpacity
                                            style={styles.iconBox}
                                            onPress={() => toggleOptions(index)}>
                                            <SimpleLineIcons name="options-vertical" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View >

                                    {renderOptions(index, task)}
                                </View >

                            ))}
                        </ScrollView >
                )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30
    },
    header: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center"
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#094FAF',
        padding: 10,  // All sides are 10
        paddingHorizontal: 20,  // Left and right are 20
        borderRadius: 15,
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
    },
    taskSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        justifyContent: "space-between"
    },
    boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    taskCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F23E3E',
        backgroundColor: '#EEEEEE',
        padding: 10,
        borderRadius: 10
    },
    taskItem: {
        padding: 15,
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,

        position: 'relative',
        zIndex: 1
    },

    NoTask: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    lastChildPadding: {
        marginBottom: 40
    },
    taskHeaderText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '70%'
    },
    status: {
        fontSize: 16,
        color: '#094FAF'
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginTop: 14
    },
    iconBox: {
        alignSelf: "flex-end",
        marginBottom: 50,
    },

    // Option Style
    optionsContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '70%',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 110,
        right: 20
    },
    optionButton: {
        padding: 10,
        marginTop: 5,
        borderBottomWidth: 2,
        borderBlockColor: '#eee8'
    },
    optionText: {
        // color: 'white',
    },
});

export default HomeScreen;