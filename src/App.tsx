import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import { ColorModeContext } from "./context/ColorModeContext";
import "./App.css";
import Switch from "@mui/material/Switch/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardActions from "@mui/material/CardActions/CardActions";
import ToDoList from "./components/ToDoList";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LightSwitch } from "./assets/lightSwitch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

function App() {
  const colorMode = useContext(ColorModeContext);
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<todo[]>([]);
  const [filter, setFilter] = useState<string>("");

  const handleFilter = async (filter: string) => {
    setFilter(filter);
  };

  const handleDelete = async (item: todo) => {
    setTodoList((todoList) =>
      todoList?.filter((todo: todo) => todo.id !== item.id)
    );
  };

  const handleDeleteAll = async () => {
    setTodoList((todoList) =>
      todoList?.filter((todo: todo) => !todo.completed)
    );
  };

  const handleEdit = async (item: todo) => {
    setTodoList((todoList) =>
      todoList?.map((input) => {
        return input.id === item.id ? { ...input, todo: item.todo } : input;
      })
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (todo === "") {
      console.log("input cannot be empty");
    } else {
      const newTodo: todo = {
        id: todoList.length + 1,
        todo: todo,
        completed: false,
        userId: 1,
      };
      setTodoList((todoList) => [...todoList, newTodo]);
      setTodo("");
    }
  };

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
  }, []);

  return (
    <>
      <Card className="card" raised>
        <div style={{ display: "flex" }}>
          <CardActions className="toggle">
            {/* <FormControlLabel
              control={
                <Switch defaultChecked onChange={colorMode.toggleColorMode} />
              }
              label="Toggle Theme"
            /> */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Light</Typography>
              <LightSwitch
                defaultChecked
                onChange={colorMode.toggleColorMode}
              />
              <Typography>Dark</Typography>
            </Stack>
          </CardActions>
          <CardHeader title="To Do List" />
        </div>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className="textbox"
              variant="outlined"
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
              <Button onClick={() => handleFilter("completed")}>
                Completed
              </Button>
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
                .map((data: any) => (
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
    </>
  );
}

export default App;
