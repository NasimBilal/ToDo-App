import React, {useState} from 'react';
import './App.css';
import {FormControl, Input, InputLabel, Fab, AppBar, Toolbar, Typography, makeStyles, Button, Dialog, DialogTitle, DialogActions} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  title: {
    flexGrow: 1,
  },
  dialog: {
    width: 200,
    backgroundColor: red,
  }
}));

function App(){

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');

  const [add, setAdd] = useState([]);
  
  const [deleted, setDeleted] = useState([]);
  

  const [done, setDone] = useState([]);
  
  const add_item = (event) => {
    event.preventDefault();
    setAdd([...add, input])
    setInput('');
  }
  
  const remove_task = (w)=>{
    if(!window.confirm("Are you sure you want to delete this?")){
      return;
    }
    setDeleted([...deleted, add.splice(w,1)]);
    setAdd([...add]);
  }

  const done_task =(d)=>{
    setDone([...done, add.splice(d,1)])
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const classes = useStyles();
  
  return(
    <div className="app">
      <h2 className="welcome">Welcome</h2>
      <h3 className="add-your-task">Add Your Tasks...</h3>
      <form className="form">
        <FormControl className="form-control">
          <InputLabel>Add Item</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Fab color="primary" size="medium" aria-label="add" onClick={add_item} type="submit" disabled={!input}>
            <AddIcon  />
          </Fab>
        </FormControl>
      </form>
      <div className="box">
        {
          add.map((obj,i)=>{
          return(
            <div className={classes.root}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  {obj}
                </Typography>
                <DoneOutlineIcon className="done" onClick={()=>{done_task(i)}}/>
                <DeleteOutlineRoundedIcon className="remove" onClick={()=>{remove_task(i)}}/>
              </Toolbar>
            </AppBar>
          </div>
          )})
        }
      </div>
      <Button onClick={handleClickOpen}>Open Completed Tasks</Button>
      <Dialog open={open} onClose={handleClose}>
        {
          done.map((object)=>{
            return(
              <DialogTitle className={classes.dialog}><li>{object}</li></DialogTitle>
            )
          })
        }
      <DialogActions>
        <Button onClick={handleClose} color="primary">Ok</Button>
      </DialogActions>
      </Dialog>

      <Button disabled={!deleted} onClick={handleClickOpen}>Open Cancelled Tasks</Button>
      <Dialog  disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
      {
        deleted.map((object)=>{
          return(
            <DialogTitle className={classes.dialog}><li>{object}</li></DialogTitle>
          )
        })
      }
      <DialogActions>
        <Button onClick={handleClose} color="primary">Ok</Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}


export default App;

