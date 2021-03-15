import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
   
    return (
       /*  we can also write consy Tasks = (props) => {}
       tasks.push({adding data is not possible to tasks using push or 
            any methods becuase states are immutable they cann't be change directly }) 
        -- we can change it using state function setTasks([...tasks, {}]); */
        <>
           {tasks.map((task) => (
            <Task key = {task.id} task = {task} removeTask = {onDelete} onToggle={onToggle} />
            )
           )}            
        </>
    )
}

export default Tasks
