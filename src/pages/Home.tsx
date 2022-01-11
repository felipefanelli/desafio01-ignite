import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const currentTime = new Date().getTime();

    const newTask = {
      id: currentTime,
      title: newTaskTitle,
      done: false
    } as Task;

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks( oldTasks => {
      return oldTasks.map<Task>((task)=>{
        if(task.id == id){
          task.done = task.done? false : true;
        }
        return task;
      })
      
    });
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(item => item.id != id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})