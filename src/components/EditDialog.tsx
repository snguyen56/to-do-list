import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../assets/Dialog.css";
import { todo } from "../App";

type Props = {};

export default function EditDialog({
  data,
  handleEdit,
}: {
  data: todo;
  handleEdit: any;
}) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (todo === "") {
      setError(true);
      console.log("input cannot be empty");
    } else {
      setError(false);
      data.todo = todo;
      handleEdit(data);
      setTodo("");
      handleClose();
    }
  };

  return (
    <>
      <IconButton disableRipple onClick={() => handleClickOpen()}>
        <ModeEditIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit To Do Item</DialogTitle>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            maxWidth: "350px",
            height: "80px",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <TextField
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
      </Dialog>
    </>
  );
}
