import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/system";
import { useEffect, useState, useContext } from "react";
import { ColorModeContext } from "./hooks/ColorModeContext";
import { useTheme } from "@mui/material/styles";
import "./App.css";
import Switch from "@mui/material/Switch/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardActions from "@mui/material/CardActions/CardActions";

type todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
      setTodo("");
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
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
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
        <CardActions>
          <FormControlLabel
            className="card-footer"
            control={
              <Switch defaultChecked onChange={colorMode.toggleColorMode} />
            }
            label="Toggle Theme"
          />
        </CardActions>
      </Card>
    </>
  );
}

export default App;
