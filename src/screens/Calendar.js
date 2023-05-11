import moment from 'moment';
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import  { View, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CalendarPicker from 'react-native-calendar-picker';
import { light, dark, screenStyles } from './screenStyles'
import { setDate, setToday, getToday } from '../features/datesSlice';
import { getAllTodosAsync } from '../features/todosSlice'
import { Spacer } from '../components/Spacer';

export const Calendar = () => {
    const {navigate}= useNavigation()
    const styles = screenStyles()
    const dispatch = useDispatch()
    const today = useSelector(getToday)

    const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Now', 'Dez']

    useEffect(() => {
        const newToday = moment(new Date()).format('YYYY-MM-DD')
        if( today !== newToday){
            dispatch(setToday(newToday))
            dispatch(setDate(newToday))
        }
        dispatch(getAllTodosAsync())
    }, [])

    const onDateChange = (date) => {
        dispatch(setDate(JSON.stringify(date).substring(1, 11)))
        navigate('ToDo')
    }

    return (
        <View style={styles.screen}>
            <Spacer />
            <View style={styles.bannercontainer}>
                <ImageBackground 
                    source={require('../../assets/banner.png')}
                    style={styles.banner}
                    resizeMode='cover' />
            </View>
            <View style={styles.contentbox}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={false}
                    weekdays={weekdays}
                    months={months}
                    monthTitleStyle={styles.calendartitle}
                    yearTitleStyle={styles.calendartitle}
                    previousTitleStyle={styles.calendartitle}
                    nextTitleStyle={styles.calendartitle}                    
                    previousTitle='<'
                    nextTitle='>'
                    todayBackgroundColor={light}
                    selectedDayColor={dark}
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                />
            </View>
        </View>
    )
}

