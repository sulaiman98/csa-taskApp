import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const PasswordUpdateScreen = function ({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handlePasswordUpdate = () => {
        // Handle update passoword here
        console.log('Task created:', { email, password });
    };

    return (
        <KeyboardAvoidingView behavior='padding'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView
                    // SafeAreaView showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 130, paddingHorizontal: 35, }}
                >
                    <Text style={styles.signInText}>Update Your Password</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#eee"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
                            keyboardType='email-address'
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#eee"
                            value={password}
                            onChangeText={(text) => setpassword(text)}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity style={styles.addButton}
                            onPress={handlePasswordUpdate}
                        >
                            <Text style={styles.buttonText}>Update Password</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#094FAF', // Background color
        // padding: 10,  // All sides are 10
        // paddingHorizontal: 50,  // Left and right are 20
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"

    },
    form: {
        justifyContent: "space-between",
        alignContent: "center"
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white', // Input border color
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        color: '#eee'
    },

    option: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    optionText: {
        color: '#fff',
    },

    addButton: {
        backgroundColor: '#fff',
        padding: 13,  // All sides are 10
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonText: {
        color: '#094FAF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        borderRadius: 10, // Set the border radius
        borderWidth: 2, // Set the border width
        borderColor: '#3498db', // Set the border color to blue
        padding: 10, // Add some padding for better visual appearance
    },
});

export default PasswordUpdateScreen;

