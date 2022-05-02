import React, { useStarte } from 'expo-status-bar';
import {useState} from 'react'

import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View, Platform,TextInput } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(intemsCopy);
  }

  return (
    <View styles={styles.container}>

      {/*Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity Key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>
    {/* Write a task*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "IOS" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChagerText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {},
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    whdth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    whdth: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#C0C0C0',
    borderWidth: 1,
    whdth: 250,

  },
  addText: {
    width: 60,
    height: 60,
    backgroundColor: 'center',
    borderRadius: 60,
    justifyContent: ' center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,


  },

})


