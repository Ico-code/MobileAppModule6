export interface Todolist {
  id: string;
  title: string;
  description: string;
}

const useToDoService = () => {
  const getToDoLists = (): Todolist[] => {
    return JSON.parse(localStorage.getItem("todolists") || "[]");
  };

  const deleteToDoList = (id: string) => {
    const todolists = getToDoLists();
    const updatedToDoLists = todolists.filter((todolist) => todolist.id !== id);
    localStorage.setItem("todolists", JSON.stringify(updatedToDoLists));
    return updatedToDoLists;
  };

  const addToDoLists = (todolists: Todolist[]) => {
    const existingToDoLists = JSON.parse(
      localStorage.getItem("todolists") || "[]"
    );

    const updatedToDoLists = [...existingToDoLists, ...todolists];

    localStorage.setItem("todolists", JSON.stringify(updatedToDoLists));
  };

  const defaultToDolists = (): Todolist[] => {
    return [
      {
        id: "1",
        title: "Test Title",
        description: "Testing5",
      },
      {
        id: "2",
        title: "Test Title",
        description: "Testing4",
      },
      {
        id: "3",
        title: "Test Title",
        description: "Testing3",
      },
      {
        id: "4",
        title: "Test Title",
        description: "Testing2",
      },
      {
        id: "5",
        title: "Test Title",
        description: "Testing1",
      },
    ];
  };

  return {
    getToDoLists,
    deleteToDoList,
    addToDoLists,
    defaultToDolists,
  };
};

export default useToDoService;
