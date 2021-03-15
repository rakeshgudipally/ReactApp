import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About'
import {useState, useEffect} from 'react';

function App() {
  //const name = true;
  //onAddTask is for toggle color for div and setTasks is updating data in server
  const [showAddTask, onAddTask] = useState(false)
  const [tasks, setTasks]= useState([])

  useEffect(() => {
    const getTasks = async () => {
      const getTasksFromServer = await fetchTasks();
      setTasks(getTasksFromServer);
    }
    getTasks();
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const result = await fetch('http://localhost:5000/tasks');
    const data = await result.json();
    return data;
  }

  const addTask = () => {
    onAddTask(!showAddTask);
  }

  const onSave = async(task) => {
    //const id = Math.floor(Math.random() * 100) + 1;
    //  const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
    const result = await fetch('http://localhost:5000/tasks', 
    {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await result.json();
    setTasks([...tasks, data]);

  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task.id !== id)
    );
  }

  // fetch task to toggle reminder
  const fetchTask = async (id) => {
    const result = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await result.json();
    console.log(data);
    return data;
  }

  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder : !taskToToggle.reminder}
    const result = await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await result.json();
    console.log('toogle', data);
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, reminder: data.reminder } : task ))
  }

  return (
    <Router>
    <div className='container'>
    {/*  <h4>Gudipally, { name ? 'yes' : 'no'}</h4> 
    title is prop moved it as default prop  <Header title = 'Welocme to RIC'/> */}
      <Header toggleAdd ={addTask} showAddTask = {showAddTask}/>
      
      <Route path ='/' exact render = { (props) => (
        <>
          {showAddTask && <AddTask onSave = {onSave}/>}
          {tasks.length > 0 ? 
          (<Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleRemainder}/>) : 
            "No Tasks to delete"}
        </>
      )} />

      <Route path= '/About' component={About}></Route> 
      <Footer />
    </div>
    </Router>
  );
}

// class component 
// class App extends React.Component{
//   render(){
//     return <h1>Hellow</h1>
  
//   }
// }

export default App;
