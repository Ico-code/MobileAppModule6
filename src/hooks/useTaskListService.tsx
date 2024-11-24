import React, { createContext, useContext, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export enum TaskState {
    completed = "Completed",
    incomplete = "Incomplete"
}
export interface Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  state:TaskState,
}

export const useService = () => {
  const getTasks = (): Task[] => {
    return JSON.parse(localStorage.getItem("tasks") || "[]"); 
  };

  const deleteTasks = (id: string) => {
      const tasks = getTasks();
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
  };

  const addTasks = (task:Task) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = [...existingTasks, task];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const defaultTasks = () => {
    return [
      {
        id: "1",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing5",
        state: TaskState.completed
      },
      {
        id: "2",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing4",
        state: TaskState.completed
      },
      {
        id: "3",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing3",
        state: TaskState.completed
      },
      {
        id: "4",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing2",
        state: TaskState.incomplete
      },
      {
        id: "5",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing1",
        state: TaskState.incomplete
      },
    ];
  }

  return {
    getTasks,
    deleteTasks,
    addTasks,
    defaultTasks
  };
};

export default useService;
