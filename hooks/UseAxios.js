import axios from 'axios';
import React from 'react'
import { generateRandomId } from '../helpers/getRandomId';
import { Alert } from 'react-native';

export function useTasksApi() {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const api = axios.create({
    baseURL: 'https://6516149809e3260018c966c1.mockapi.io/taskify',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const handleApiError = (error) => {
    console.error('Error:', error);
    // message.error('Something went wrong, please try again');
    setError(error);
  }

  const newUser = async (username, password, name, avatar, lastname, navigation) => {
    try {
      setLoading(true);
      const data = {
        name: name,
        lastname: lastname,
        password: password,
        email: username,
        avatar: avatar,
        id: generateRandomId(),
      };

      await api.post('/users', data)
      Alert.alert('User created')
      navigation.navigate('login')
      // message.success('User created')
      setLoading(false)
      return true

    } catch (error) {
      handleApiError(error)
      setLoading(false)
      return false
    }
  }

  const onLogin = async (username, password, login, navigation, setUsername, setPassword) => {
    try {
      setLoading(true);
      const user_ = username.toLowerCase()
      const response = await api.get('/users');
      const user = response.data.find(user => user.email === user_)
      if (user) {
        if (user.password === password) {
          login(user.email, user.name, user.lastname, user.id, user.avatar)
          navigation.navigate('home')
          setUsername('')
          setPassword('')
        } else Alert.alert('User not found')
        // else message.error('User not found')
      } else {
        Alert.alert('User not found')
      }

      // lse message.error('User not found')

      setLoading(false)
    } catch (error) {
      handleApiError(error)
      setLoading(false)
    }
  }


  const getTasks = async (user, setTasks) => {
    try {
      setLoading(true);

      const response = await api.get('/tasks');
      const mytasks = response.data.filter((task) => task.createdBy === user._id);

      if (mytasks) {
        setTasks(mytasks);
      } else {
        // message.error("It seems that you don't have tasks yet");
      }

      setLoading(false)
    } catch (error) {
      handleApiError(error)
      setLoading(false)
    }
  }

  const newtask = async (data, setTaskState) => {
    try {
      setLoading(true);

      const response = await api.post('/tasks', data);
      console.log(response)
      setTaskState(true)

      setLoading(false)
      return true
    } catch (error) {
      handleApiError(error)
      setLoading(false)
      return false
    }
  }

  const editTask = async (data, setTaskState) => {
    try {
      setLoading(true)

      const response = await api.put(`/tasks/${data.id}`, data)
      console.log(response)
      setTaskState(true)

      setLoading(false)
      return true
    } catch (error) {
      handleApiError(error)
      setLoading(false)
      return false
    }
  }

  const deleteTask = async (id, setTaskState) => {
    try {
      setLoading(true)

      const response = await api.delete(`/tasks/${id}`)
      console.log(response)
      // message.success('Task deleted')
      // setCollapsed(true)
      setTaskState(true)

      setLoading(false)
      // return true
    } catch (error) {
      handleApiError(error)
      setLoading(false)
      // return false
    }
  }

  return {
    newUser,
    onLogin,
    getTasks,
    newtask,
    editTask,
    deleteTask,
    loading,
    error,
  }
}
