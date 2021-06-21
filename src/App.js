import React, {useState} from 'react';
import './App.css';
import {FormControl,FormControlLabel,Switch, Input, InputLabel, Fab, AppBar, Toolbar, Typography, 
  makeStyles, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    flexGrow: 1,
  },
  accordion: {
    width: '50%',
    margin: 'auto',
  }
}));

function App(){

  const [input, setInput] = useState('');

  const [add, setAdd] = useState([]);
  
  const [deleted, setDeleted] = useState([]);

  const [done, setDone] = useState();
  
  const add_item = () => {
    setAdd([...add, input])
    setInput('');
  }
  
  const remove_task = (w)=>{
    if(!window.confirm("Are you sure you want to delete this?")){
      return;
    }
    setDeleted([...deleted, add.splice(w,1)]);
    console.log(deleted)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setDone(event.target.checked);
  };

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
                  <FormControlLabel
                  control={<Switch checked={done} onChange={handleChange} name="done" />}
                  label="Completed"
                  />
                  <DeleteOutlineRoundedIcon className="remove" onClick={()=>{remove_task(i)}}/>
                </Toolbar>
              </AppBar>
            </div>
          )})
        }
      </div>
      <div className={classes.accordion}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Deleted Tasks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {
                deleted.map((object)=>{
                  return(
                    <div className="deleted">
                    <p>{object}</p>
                  </div>
                  )
                })
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}


export default App;

