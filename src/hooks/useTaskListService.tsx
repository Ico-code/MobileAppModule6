import React, { createContext, ReactNode, useContext, useState } from "react";

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

interface TaskContextType {
  activeTaskList: Task[];
  setActiveTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskListContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskListContext must be used within a StateProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ activeTaskList, setActiveTaskList }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskUpdater = () => {
  const { activeTaskList, setActiveTaskList } = useTaskListContext();

  const updateActiveTaskListByRemoval = (idToRemove: string) => {
    const updatedTasks = activeTaskList.filter(
      (task) => task.id !== idToRemove
    );
    setActiveTaskList(updatedTasks);
  };

  const initializeActiveTaskList = (updatedTasks: Task[]) => {
    setActiveTaskList(updatedTasks);
  };

  const addTasksToActiveTaskList = (Tasks: Task[]) => {
    setActiveTaskList((prev) => [...prev, ...Tasks]);
  };

  const updateActiveTaskList = (Task:Task) => {
    const index = activeTaskList.findIndex((task) => task.id === Task.id);
    if (index === -1) {
      console.error("Object not found in local storage.");
      return;
    }

    setActiveTaskList(activeTaskList.map((item, i) => (i === index ? Task : item)));
  }

  return {
    updateActiveTaskListByRemoval,
    initializeActiveTaskList,
    addTasksToActiveTaskList,
    updateActiveTaskList,
  };
};

export const useService = () => {
  const {
    updateActiveTaskListByRemoval,
    initializeActiveTaskList,
    addTasksToActiveTaskList,
    updateActiveTaskList,
  } = useTaskUpdater();

  const getTasksFromLocalStorage = (parentId: string = "") => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return parentId === ""
      ? tasks
      : tasks.filter((task) => task.parentListId === parentId);
  };

  const getTasks = (parentId: string = "") => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    initializeActiveTaskList(
      parentId === ""
        ? tasks
        : tasks.filter((task) => task.parentListId === parentId)
    );
  };

  const deleteTasks = (id: string) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    updateActiveTaskListByRemoval(id);
  };

  const addTasks = (tasks: Task[]) => {
    const existingTasks = getTasksFromLocalStorage();

    const updatedTasks = [...existingTasks, ...tasks];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    addTasksToActiveTaskList(tasks);
  };

  const editTaskList = (Task: Task) => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskIndex = tasks.findIndex((task) => task.id === Task.id);
    if (taskIndex === -1) {
      console.error("Object not found in local storage.");
      return;
    }
    const newTaskList = tasks.map((item, i) => (i === taskIndex ? {...item , ...Task }: item))
    localStorage.setItem("tasks", JSON.stringify(newTaskList));

    updateActiveTaskList(Task);
  };

  const fetchSpecificTask = (taskId: string): Task | undefined => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = tasks.find((task) => task.id === taskId);

    return taskId === "" ? undefined : task;
  };

  const defaultTasks = () => {
    return [
      {
        id: "1",
        parentListId: "1",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing5",
        state: "Completed",
      },
      {
        id: "2",
        parentListId: "1",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing4",
        state: "Completed",
      },
      {
        id: "3",
        parentListId: "2",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing3",
        state: "Completed",
      },
      {
        id: "4",
        parentListId: "3",
        title: "Test Title",
        subtitle: "somekind of subtitle like recipe",
        description: "Testing2",
        state: "Incomplete",
      },
      {
        id: "33dbc1e6-daf8-406b-b941-aa20d2d87796",
        parentListId: "1",
        title: "Cook pasta",
        subtitle: "Cooking",
        description:
          "You need to cook pasta to be able to eat and not starve to death.",
        state: "Incomplete",
      },
      {
        id: "37845327-a068-49a0-9f3b-e38512bcb68d",
        parentListId: "1",
        title: "Sleep",
        subtitle: "Activity",
        description: "",
        state: "Incomplete",
      },
      {
        id: "5da7ecb3-58bb-4028-821a-9033a6e757e9",
        parentListId: "1",
        title: "Excercise",
        subtitle: "",
        description: "Excercise a little, maybe just stand up and walk around",
        state: "Incomplete",
      },
      {
        id: "a5cba175-7585-46fa-8a68-2a2776728633",
        parentListId: "1",
        title: "Visual Design",
        subtitle: "",
        description: "",
        state: "Incomplete",
      },
      {
        id: "580af70a-6b5f-46c9-b8d0-74b4b42beca9",
        parentListId: "2",
        title: "Testing long strings",
        subtitle:
          "long string:   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum earum vitae enim tempore, hic debitis obcaecati ratione, perspiciatis eum sit accusamus corrupti quisquam dignissimos in voluptatum fugiat, pariatur aliquam!",
        description:
          "longer string:   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum earum vitae enim tempore, hic debitis obcaecati ratione, perspiciatis eum sit accusamus corrupti quisquam dignissimos in voluptatum fugiat, pariatur aliquam!;   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum earum vitae enim tempore, hic debitis obcaecati ratione, perspiciatis eum sit accusamus corrupti quisquam dignissimos in voluptatum fugiat, pariatur aliquam!",
        state: "Incomplete",
      },
      {
        id: "df4fd68a-a345-4095-96f7-b319ff7eba77",
        parentListId: "2",
        title: "How does this look",
        subtitle: "!!!!!!!!!!!!!",
        description: "",
        state: "Incomplete",
      },
    ];
  };

  return {
    getTasks,
    deleteTasks,
    addTasks,
    editTaskList,
    defaultTasks,
    fetchSpecificTask,
  };
};

export default useService;
