import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDialog from "./EditDialog";
import Checkbox from "@mui/material/Checkbox";
import "../assets/ToDoList.css";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { todo } from "../App";

type Props = {
  data: todo;
  handleEdit: (data: todo) => void;
  handleDelete: (data: todo) => void;
};

function ToDoList({ data, handleEdit, handleDelete }: Props) {
  const [check, setCheck] = useState<boolean>(data.completed);
  const handleChange = () => {
    data.completed = !data.completed;
    setCheck((check) => !check);
  };

  return (
    <div className="container">
      <div style={{ marginRight: 50 }}>
        <FormControlLabel
          control={<Checkbox checked={check} onChange={handleChange} />}
          label={data.todo}
          style={{ textDecoration: data.completed ? "line-through" : "" }}
        />
      </div>

      <div style={{ minWidth: 80 }}>
        <EditDialog data={data} handleEdit={handleEdit} />
        <IconButton disableRipple onClick={() => handleDelete(data)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ToDoList;
