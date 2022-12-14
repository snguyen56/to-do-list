import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDialog from "./EditDialog";
import Checkbox from "@mui/material/Checkbox";
import "../assets/ToDoList.css";

type Props = {};

function ToDoList({ data, handleEdit, handleDelete }: any) {
  return (
    <div className="container">
      <div style={{ marginRight: 50 }}>
        <Typography>
          <Checkbox checked={data.completed} />
          {data.todo}
        </Typography>
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
