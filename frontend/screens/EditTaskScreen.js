// AddTaskScreen.js
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { RadioButton } from 'react-native-paper';
import { URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Convert Date To Backend Format
const converDateToBackendFormat = (dataString) => {
    const [year, month, day] = dataString.split('/');
    return `${year}-${month}-${day}`;
}

const EditTaskScreen = ({ route, navigation }) => {
    // Get task data from navigation params
    const { taskData } = route.params;

    const [title, setTitle] = useState(taskData.taskname);
    const [description, setDescription] = useState(taskData.taskdescription);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('None');
    const [status, setStatus] = useState(taskData.status);


    const handleUpatedTask = async () => {
        try {
            // Getting User ID from AsynStorage
            const userId = await AsyncStorage.getItem('UserId');
            console.log('user', userId);

            // if (!title || !description || !startDate || !endDate || !priority) {
            //     Alert.alert(
            //         'Missing field', 'You have some missing fields to fill'
            //     ), [{ text: 'Okay' }];
            //     return;
            // }

            const response = await axios.put(`${URL}/update-task/${taskData.id}`, {
                taskname: title,
                taskdescription: description,
                startdate: converDateToBackendFormat(startDate),
                enddate: converDateToBackendFormat(endDate),
                priority: priority,
                status: status,
                user_id: userId
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Success:', response.data);
            // Alert Message
            Alert.alert(
                'Upated', 'Task Updated Successfully',
                [{ text: 'Okay' }]
            );

            navigation.navigate('HomeStack');

        } catch (error) {
            console.log('Error:', error);
        }

    };

    return (
        <ScrollView style={styles.container} ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 40 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={(val) => setTitle(val)}
                />

                <TextInput
                    style={{ ...styles.input, height: 80, }}
                    placeholder="Task Description"
                    multiline
                    numberOfLines={4}

                    value={description}
                    onChangeText={(val) => setDescription(val)}

                />

                <Text style={styles.DateStyle}>Choose Start Date</Text>
                <DatePicker
                    mode="calendar"
                    selected={taskData.startdate}
                    onSelectedChange={date => setStartDate(date)}
                />

                <Text style={styles.DateStyle}>Choose End Date</Text>
                <DatePicker
                    mode="calendar"
                    // current="2020-07-13"
                    selected={taskData.enddate}
                    onSelectedChange={date => setEndDate(date)}
                />

                <Text style={styles.DateStyle}>Status</Text>

                <RadioButton.Group onValueChange={(val) => setStatus(val)} value={status}>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioItem}>
                            <RadioButton value="On-going" />
                            <Text style={styles.radioLabel}>On-going</Text>
                        </View>

                        <View style={styles.radioItem}>
                            <RadioButton value="Completed" />
                            <Text style={styles.radioLabel}>Completed</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <TouchableOpacity style={styles.addButton}
                    onPress={handleUpatedTask}
                >
                    <Text style={styles.buttonText}>Update Task</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        paddingTopTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        paddingHorizontal: 10,
        backgroundColor: "#eee",
        borderRadius: 5,
        gap: 25,
    },
    DateStyle: {
        backgroundColor: "#eee",
        borderRadius: 5,
        // marginBottom: 20,
        padding: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 20,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
    },

    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },

    addButton: {
        backgroundColor: '#094FAF',
        padding: 13,  // All sides are 10
        paddingHorizontal: 20,  // Left and right are 20
        borderRadius: 15,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default EditTaskScreen;
