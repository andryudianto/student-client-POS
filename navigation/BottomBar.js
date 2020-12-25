import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Lessons from '../screens/Lesson'
import Report from '../screens/Report'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()
const tabOption = {
    showLabel: false,
    style: {
        height: "7%",
        backgroundColor: '#43ADD2',
        borderWidth: 0,
        elevation: 0
    }
}

export default function BottomTab () {
    return (
        <Tab.Navigator
            tabBarOptions={tabOption}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? 'white' : 'grey'

                    switch (route.name) {
                        case "Lessons":
                            return (
                                <Icon name="graduation-cap" size={20} color={tintColor} />
                            )
                        case "Report":
                            return (
                                <Icon name="file-text-o" size={20} color={tintColor} />
                            )
                        case "Profile":
                            return (
                                <Icon name="user" size={20} color={tintColor} />
                            )
                        default:
                            break;
                    }
                }
            })}
        >

            <Tab.Screen 
                name="Lessons"
                component={Lessons}
            />
            <Tab.Screen 
                name="Report"
                component={Report}
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
            />

        </Tab.Navigator>
    )
}