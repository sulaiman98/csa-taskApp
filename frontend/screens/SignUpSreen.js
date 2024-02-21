import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants';

const SignUpScreen = ({ navigation }) => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        comfirmPasword: "",
    });


    const handleSignUp = () => {
        if (
            !data.firstName ||
            !data.lastName ||
            !data.email ||
            !data.password
        ) {
            Alert.alert('Missing fields', 'You have some missing fields to fill');
            return;
        };

        if (data.password !== data.comfirmPasword) {
            Alert.alert('Password Mismatch', 'Password and Confirm Password did not match');
            return;
        };



        axios.post(`${URL}/register`, {
            firstname: data.firstName,
            lastname: data.lastName,
            username: data.userName,
            email: data.email,
            password: data.password,
        }, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log('Response!', response.data)
            const jsonValue = JSON.stringify(response.data)
            AsyncStorage.setItem('userData', jsonValue)
            Alert.alert(
                'Account Created Successfully', 'Please Login In',
                [{ text: 'Okay', onPress: () => navigation.navigate('SignIn') }]
            );
        }).catch((err) => {
            console.log('Error!', err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                Alert.alert('Registration Error', err.response.data.message);
            }
        });
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContentContainer}
                    style={styles.scrollView}
                >
                    <View style={styles.container}>
                        <Text style={styles.signInText}>Create your Account</Text>
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#eee"
                                value={data.firstName}
                                onChangeText={(val) => setData({ ...data, firstName: val })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#eee"
                                value={data.lastName}
                                onChangeText={(val) => setData({ ...data, lastName: val })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#eee"
                                value={data.userName}
                                onChangeText={(val) => setData({ ...data, userName: val })}
                                autoCapitalize="none" // Ensure email is not auto-capitalized
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#eee"
                                value={data.email}
                                onChangeText={(val) => setData({ ...data, email: val })}
                                autoCapitalize="none" // Ensure email is not auto-capitalized
                                keyboardType="email-address" // Set keyboard type to email address for better user experience
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#eee"
                                value={data.password}
                                secureTextEntry={true}  // Set to true to hide text content
                                onChangeText={(val) => setData({ ...data, password: val })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Comfirm Password"
                                placeholderTextColor="#eee"
                                value={data.comfirmPasword}
                                secureTextEntry={true}  // Set to true to hide text content
                                onChangeText={(val) => setData({ ...data, comfirmPasword: val })}
                            />

                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleSignUp}
                            >
                                <Text style={styles.buttonText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#094FAF',
    },
    scrollViewContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingBottom: 150,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 70,
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        alignSelf: "center"
    },
    input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        color: '#eee',
    },
    addButton: {
        backgroundColor: '#fff',
        padding: 13,
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonText: {
        color: '#094FAF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        // flexGrow: 1,
        // justifyContent: 'center',
    },
});

export default SignUpScreen;