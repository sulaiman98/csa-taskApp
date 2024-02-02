import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AntDesign, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Import your existing screen components here
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpSreen';
import PasswordUpdateScreen from '../screens/PasswordUpdateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';





const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AddTaskStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
                <AuthStack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="UpdatePasword"
                    component={PasswordUpdateScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#094FAF',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    height: 100,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <AntDesign name="home" size={35} color="#fff" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="AddTaskTab"
                component={AddTaskStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <MaterialIcons name="add-box" size={35} color="#fff" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <AntDesign name="user" size={35} color="#fff" />,
                    headerShown: false,
                    animation: 'none',
                }}
            />
        </Tab.Navigator>
    );
};

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
                title: 'Home Screen',
                animation: 'none',
                headerBackTitleVisible: true,
                headerShown: false,
            }}
        />
        <HomeStack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
                title: 'Create New Task',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />
        <HomeStack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{
                title: 'Edit Task',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />
    </HomeStack.Navigator>
);

const AddTaskStackScreen = () => (
    <AddTaskStack.Navigator>
        <AddTaskStack.Screen
            name="AddTaskStack"
            component={AddTaskScreen}
            options={{
                title: 'Create New Task',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />
    </AddTaskStack.Navigator>
);

const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
                headerShadowVisible: false,
                animation: 'none',
                headerStyle: {
                    backgroundColor: '#094FAF',
                },
                headerTitleStyle: {
                    color: '#fff',
                },
            }}
        />
        <ProfileStack.Screen
            name="EditProfileStack"
            component={EditProfileScreen}
            options={{
                title: 'Profile',
                animation: 'none',
                headerBackTitleVisible: false,
            }}
        />
    </ProfileStack.Navigator>
);

export default AppNavigator;
