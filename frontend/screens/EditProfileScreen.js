import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ route }) => {
    const { userData } = route.params;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");

    const handleEditTask = async () => {
        // Handle edit task here
        console.log('Task created:', { firstName, lastName, userName, email, address, gender, phone });
        try {
            const userId = await AsyncStorage.getItem('UserId');
            const response = await axios.put(`${URL}/update-user/${userId}`, {
                firstname: firstName,
                lastname: lastName,
                username: userName,
                email: email,
                address: address,
                gender: gender,
                phone: phone
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log("Success:", response)

            Alert.alert(
                'Upated', 'User Updated Successfully',
                [{ text: 'Okay' }]
            );

        } catch (error) {
            console.log("Error:", error)
            // if (error.response && error.response.status === 401) {
            Alert.alert('Error', 'Failed to Update User. Please try again later.');
            // };
        };
    };

    return (
        <KeyboardAvoidingView behavior='padding'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    ScrollView showsVerticalScrollIndicator={false}
                    style={{ paddingLeft: 35, paddingRight: 35 }}
                >
                    <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                        <View style={styles.profileInfo}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>First Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Last Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Username:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={userName}
                                    onChangeText={(text) => setuserName(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Gender:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={gender}
                                    onChangeText={(text) => setGender(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Address:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={address}
                                    onChangeText={(text) => setAddress(text)}
                                />
                            </View>


                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Phone:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.addButton}
                            onPress={() => handleEditTask()}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: 35,
        // paddingRight: 35,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileInfo: {
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 25,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#EEEEEE', // Input border color
        borderBottomWidth: 2,
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

export default EditProfileScreen;
