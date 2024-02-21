import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants';

const ProfileScreen = ({ navigation }) => {
    const [currentUserData, setCurrentUserData] = useState([]);
    const [image, setImage] = useState(null);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }]
        })
    };

    // Getting Image from Gallery
    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0]?.uri);
            // Send the image URI to the backend
            uploadProfileImage(result.assets[0]?.uri);
        };
    };

    const uploadProfileImage = async (uri) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.post(`${URL}/user-profile`, {
                image_uri: uri
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            console.log(response)

        } catch (error) {
            console.log("Error:", error)
        };
    };

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const firstName = await AsyncStorage.getItem("firstname")
                const lastName = await AsyncStorage.getItem("lastName")
                const userName = await AsyncStorage.getItem("userName")
                const userProfile = await AsyncStorage.getItem("userProfile")

                // console.log(userProfile);
                setCurrentUserData([firstName, lastName, userName]);

                if (userProfile !== "null") setImage(userProfile);

            } catch (error) {
                console.log(error.response)
            }
        }
        getCurrentUser();

    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.imageBox} >
                <Pressable onPress={pickImage}>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            // style={{ width: 200, height: 200 }}
                            style={styles.profileImage}
                        />) : (
                        <Image
                            source={require('../assets/user.png')}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    )}
                </Pressable>

                <Text style={styles.label}>{`${currentUserData[0]} ${currentUserData[1]}`}</Text>
            </View>

            <View style={styles.profileOption}>
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('EditProfileStack', { userData: currentUserData })}
                >
                    <AntDesign name="user" size={24} color="black" />
                    <Text style={styles.optionLabel}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={handleLogout}
                >
                    <MaterialIcons name="logout" size={24} color="black" />
                    <Text style={styles.optionLabel}>Logout</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBox: {
        backgroundColor: '#094FAF',
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: '45%'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileOption: {
        // width: '80%',
        // justifyContent: "center",

        // padding: 30,
        paddingTop: 50,
        paddingHorizontal: 30,
        gap: 20
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#eee',
        padding: 15,
        // marginTop: 20,
        gap: 15
    },
    inputContainer: {
        marginBottom: 25,
    },

    value: {
        // marginBottom: 15,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#EEEEEE', // Input border color
        // borderWidth: 1,
        // borderRadius: 5,
        borderBottomWidth: 2,
        // marginTop: 15,
        // paddingHorizontal: 10,
        // color: '#eee'
    },
});

export default ProfileScreen;
