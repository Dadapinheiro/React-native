import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();

    AsyncStorage.setItem('@tasks', JSON.stringify([...taskItems, task]));

    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = async (index) => {
    let oldTasks = await handleTasks();

    const newTasks = oldTasks.filter((_, position) => {
      return position !== index;
    })
    
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setTaskItems(newTasks)
  };

  const handleTasks = async () => {
    const result = await AsyncStorage.getItem('@tasks');

    const parsedResult = await JSON.parse(result);

    if (parsedResult === null || parsedResult === undefined) return []

    return parsedResult;
  }

  useEffect(() => {
    handleTasks().then(tasks => setTaskItems(tasks));
  }, []);

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>TAREFAS DIÁRIAS</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems?.length > 0 && taskItems?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Adicionar tarefas"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Clique</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",

  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#000000",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#ffa500",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});