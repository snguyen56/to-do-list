import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";

type todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<todo[]>([]);

  const handleDelete = async (item: todo) => {
    setTodoList((todoList) =>
      todoList?.filter((todo: todo) => todo.id !== item.id)
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
    }
  };

  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=5")
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
    // .then((data) => console.log(data.todos));
    // if (todoList) console.log(todoList);
  }, []);

  return (
    <>
      <Card className="card" raised>
        <CardHeader title="To Do List" />
        <CardContent sx={{ width: "100%" }}>
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              className="textbox"
              variant="outlined"
              onChange={(event) => setTodo(event.target.value)}
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
        </CardContent>
        <Box sx={{ p: 2 }}>
          <ul>
            {todoList?.map((data: any) => (
              <li key={data.id}>
                <Typography>
                  {data.todo}
                  <IconButton disableRipple>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton disableRipple onClick={() => handleDelete(data)}>
                    <DeleteIcon />
                  </IconButton>
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Card>
    </>
  );
}

export default App;
