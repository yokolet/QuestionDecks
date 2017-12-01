import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MyFabulousDecks:notifications'

export const getDeckEntries = (deck) => {
  const entries = {
    'e4a40b75-34e5-42af-aaed-0353b5e1bfc2': {
      id: 'e4a40b75-34e5-42af-aaed-0353b5e1bfc2',
      name: 'udacicards',
      cards: [
        {
          category: 'React',
          question: 'Does React Native work with Android?',
          answer: true,
        },
        {
          category: 'React',
          question: 'React is a library for mamanging user interfaces',
          answer: true,
        },
        {
          category: 'JavaScript',
          question: 'A closure is a combination of a function in the lexical environment',
          answer: true,
        },
      ],
    },
    '39bd7f09-7f14-47cc-b39d-8a903aa8027c': {
      id: '39bd7f09-7f14-47cc-b39d-8a903aa8027c',
      name: 'new deck',
      cards: [],
    },
    '5fa3277b-7e65-49e7-8ffa-7cf67057fd0d': {
      id: '5fa3277b-7e65-49e7-8ffa-7cf67057fd0d',
      name: 'New deck 2',
      cards: [],
    },
  }

  return typeof deck === 'undefined'
    ? entries
    : entries[deck]
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

createNotification = () => {
  return {
    title: 'Start Quiz!',
    body: "👋 don't forget to try quizes!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.clear()
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              // for debugging, short interval is used
              /*
              let next = new Date()
              next.setSeconds(next.getSeconds() + 5)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: next,
                  repeat: 'minute',
                }
              )
              */

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
