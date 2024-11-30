import React, { createContext, useContext, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export enum TaskState {
  completed = "Completed",
  incomplete = "Incomplete",
}
export interface Task {
  id: string;
  parentListId: string;
  title: string;
  subtitle: string;
  description: string;
  state: TaskState;
}

export const useService = () => {
  const getTasks = (parentId: string = ""): Task[] => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return parentId === ""
      ? tasks
      : tasks.filter((task) => task.parentListId === parentId);
  };

  const deleteTasks = (id: string) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks;
  };

  const addTasks = (tasks: Task[]) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = [...existingTasks, ...tasks];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const defaultTasks = () => {
    return [
      {
        id: "1",
        parentListId: "1",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing5",
        state: TaskState.completed,
      },
      {
        id: "2",
        parentListId: "1",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing4",
        state: TaskState.completed,
      },
      {
        id: "3",
        parentListId: "2",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing3",
        state: TaskState.completed,
      },
      {
        id: "4",
        parentListId: "3",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing2",
        state: TaskState.incomplete,
      },
      {
        id: "5",
        parentListId: "2",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing1",
        state: TaskState.incomplete,
      },
    ];
  };

  return {
    getTasks,
    deleteTasks,
    addTasks,
    defaultTasks,
  };
};

export default useService;
