import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AlarmIcon from "@mui/icons-material/Alarm";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";

type todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

function fetchToDo<T>(resourceUrl: string): Promise<T> {
  return fetch(resourceUrl).then((response) => {
    // fetching the reponse body data
    return response.json<T>();
  });
}

function App() {
  const [todo, setTodo] = useState<todo>({
    id: 1,
    todo: "",
    completed: false,
    userId: 1,
  });
  const [todoList, setTodoList] = useState<todo[]>();

  useEffect(() => {
    fetch("https://dummyjson.com/todos?limit=5")
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
    // .then((data) => console.log(data.todos));
  }, []);

  return (
    <div>
      <Card className="card" raised>
        <CardHeader title="To Do" />
        <CardContent>
          <TextField variant="outlined" />
          <Button className="button" variant="contained" disableRipple>
            Add
          </Button>
        </CardContent>
        <Box sx={{ p: 2 }}>
          <ul>
            {todoList?.map((data: any) => (
              <li>
                {data.todo}{" "}
                {/* <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton> */}
              </li>
            ))}
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </Box>
      </Card>
    </div>
  );
}

export default App;
