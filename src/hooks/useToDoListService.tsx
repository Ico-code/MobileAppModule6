import { createContext, ReactNode, useContext, useState } from "react";
import useService from "./useTaskListService";

export interface Todolist {
  id: string;
  title: string;
  description: string;
}

interface StateContextTodolist {
  activeTodolist: Todolist[];
  setActiveTodolist: React.Dispatch<React.SetStateAction<Todolist[]>>;
}

const todolistContext = createContext<StateContextTodolist | undefined>(
  undefined
);

export const useTodolistContext = () => {
  const context = useContext(todolistContext);
  if (!context) {
    throw new Error("useTodolistContext must be used within a StateProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTodolist, setActiveTodolist] = useState<Todolist[]>([]);

  return (
    <todolistContext.Provider value={{ activeTodolist, setActiveTodolist }}>
      {children}
    </todolistContext.Provider>
  );
};

export const useListUpdater = () => {
  const { activeTodolist, setActiveTodolist } = useTodolistContext();

  const updateActiveTodolistByRemoval = (idToRemove: string) => {
    const updatedList = activeTodolist.filter(
      (list: Todolist) => list.id !== idToRemove
    );
    setActiveTodolist(updatedList);
  };

  const initializeActiveTodolist = (updatedList: Todolist[]) => {
    setActiveTodolist(updatedList);
  };

  const addTasksToActiveTodolist = (List: Todolist[]) => {
    setActiveTodolist((prev) => [...prev, ...List]);
  };

  const updateActiveTodoList = (todolist:Todolist) => {
    const index = activeTodolist.findIndex((list) => list.id === todolist.id);
    if (index === -1) {
      console.error("Object not found in local storage.");
      return;
    }

    setActiveTodolist(activeTodolist.map((item, i) => (i === index ? todolist : item)));
  }

  return {
    updateActiveTodolistByRemoval,
    initializeActiveTodolist,
    addTasksToActiveTodolist,
    updateActiveTodoList,
  };
};

const useToDoService = () => {
  const {
    initializeActiveTodolist,
    addTasksToActiveTodolist,
    updateActiveTodolistByRemoval,
    updateActiveTodoList
  } = useListUpdater();

  const {
    deleteTasksForSpecificList
  } = useService();

  const getToDoListsFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("todolists") || "[]");
  };

  const fetchSpecificList = (id: string): Todolist | undefined => {
    const lists: Todolist[] = JSON.parse(localStorage.getItem("todolists") || "[]");
    const list = lists.find((task) => task.id === id);

    return id === "" ? undefined : list;
  };

  const getToDoLists = () => {
    initializeActiveTodolist(
      JSON.parse(localStorage.getItem("todolists") || "[]")
    );
  };

  const deleteToDoList = (id: string) => {
    const todolists = getToDoListsFromLocalstorage();
    const updatedToDoLists = todolists.filter(
      (list: Todolist) => list.id !== id
    );
    localStorage.setItem("todolists", JSON.stringify(updatedToDoLists));

    updateActiveTodolistByRemoval(id);
    deleteTasksForSpecificList(id);
  };

  const addToDoLists = (todolists: Todolist[]) => {
    const existingToDoLists = JSON.parse(
      localStorage.getItem("todolists") || "[]"
    );

    const updatedToDoLists = [...existingToDoLists, ...todolists];

    localStorage.setItem("todolists", JSON.stringify(updatedToDoLists));

    addTasksToActiveTodolist(todolists);
  };

  const editToDoList = (todolist: Todolist) => {
    const lists: Todolist[] = JSON.parse(localStorage.getItem("todolists") || "[]");
    const listIndex = lists.findIndex((list) => list.id === todolist.id);
    if (listIndex === -1) {
      console.error("Object not found in local storage.");
      return;
    }
    const newList = lists.map((item, i) => (i === listIndex ? {...item , ...todolist }: item))
    localStorage.setItem("todolists", JSON.stringify(newList));

    updateActiveTodoList(todolist);
  };

  const defaultToDolists = (): Todolist[] => {
    return [
      {
        id: "1",
        title: "General Tasks",
        description: "A list of general tasks to complete",
      },
      {
        id: "2",
        title: "Work Tasks",
        description: "Tasks related to work and projects",
      },
      {
        id: "3",
        title: "Home Tasks",
        description: "Tasks to do around the house",
      },
    ];
  };

  return {
    getToDoLists,
    deleteToDoList,
    addToDoLists,
    editToDoList,
    defaultToDolists,
    fetchSpecificList,
  };
};

export default useToDoService;
