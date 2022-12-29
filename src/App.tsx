import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import { ColorModeContext } from "./context/ColorModeContext";
import "./App.css";
import CardActions from "@mui/material/CardActions/CardActions";
import ToDoList from "./components/ToDoList";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LightSwitch } from "./assets/LightSwitch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export type todo = {
  id: string;
  todo: string;
  completed: boolean;
};

function App() {
  const colorMode = useContext(ColorModeContext);
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const colRef = collection(db, "todos");

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleDelete = (item: todo) => {
    const docRef = doc(db, "todos", item.id);
    deleteDoc(docRef);
  };

  const handleDeleteAll = () => {
    todoList.forEach((todo) => {
      if (todo.completed) {
        const docRef = doc(db, "todos", todo.id);
        deleteDoc(docRef);
      }
    });
  };

  const handleEdit = (item: todo) => {
    const todoDoc = doc(db, "todos", item.id);
    updateDoc(todoDoc, { todo: item.todo });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo === "") {
      setError(true);
      console.log("input cannot be empty");
    } else {
      setError(false);
      addDoc(colRef, { todo: todo, completed: false });
      setTodo("");
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      colRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        setTodoList(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todo: doc.data().todo,
              completed: doc.data().completed,
            };
          })
        );
      }
    );
    return unsub;
  }, []);

  return (
    <Card className="card" raised>
      <div style={{ display: "flex" }}>
        <CardActions className="toggle">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Light</Typography>
            <LightSwitch defaultChecked onChange={colorMode.toggleColorMode} />
            <Typography>Dark</Typography>
          </Stack>
        </CardActions>
        <CardHeader title="To Do List" />
      </div>
      <CardContent style={{ paddingBottom: 0 }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className="textbox"
            variant="outlined"
            error={error}
            helperText={error ? "Input cannot be empty" : ""}
            onChange={(event) => setTodo(event.target.value)}
            value={todo}
          />
          <Button
            type="submit"
            className="button"
            variant="contained"
            disableRipple
          >
            Add
          </Button>
        </form>
        <div className="button-container">
          <ButtonGroup variant="contained">
            <Button onClick={() => handleFilter("")}>All</Button>
            <Button onClick={() => handleFilter("pending")}>Pending</Button>
            <Button onClick={() => handleFilter("completed")}>Completed</Button>
          </ButtonGroup>
          <Button color="error" variant="contained" onClick={handleDeleteAll}>
            Delete All
          </Button>
        </div>
        <Box sx={{ p: 2, pb: 0 }}>
          <ul>
            {todoList
              ?.filter((todo: todo) => {
                if (filter === "pending") {
                  return !todo.completed;
                } else if (filter === "completed") {
                  return todo.completed;
                } else {
                  return true;
                }
              })
              .map((data: todo) => (
                <li key={data.id}>
                  <ToDoList
                    data={data}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </li>
              ))}
          </ul>
        </Box>
      </CardContent>
    </Card>
  );
}

export default App;
