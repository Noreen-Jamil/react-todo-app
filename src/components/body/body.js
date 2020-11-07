import React , {useState} from "react";
import "./body.css";
import Li from "../li/li";

const Body = () =>{
    const [currentTodo , setTodo] = useState("");
    const [currentDate , setDate] = useState("");
    const [currentTime , setTime] = useState("");
    const [currentstate , setStateUpdate] = useState(false);
    const [ isTodoUpdated, setTodoUpdated] = useState(false);
    const [currentToDoArray, setToDoarray] = useState([{}]);
    let todoData;
  
    //display list of to dos
    const getToDo = () =>{
        if(currentTodo !== ""){
            todoData = {
                todo : currentTodo,
                date : currentDate,
                time : currentTime,
                taskState : false
            }
           setToDoarray([...currentToDoArray , todoData]);
           setTodo("");
           setDate("");
           setTime("");
        }else{
            alert("ToDo text is required");
        }
    }

    // call this function on cross icon click to delete selected todo
    const taskDelete = (id) => {
        setToDoarray(currentToDoArray.filter( (element , index) => {
            if(index !== id){
                return element;
            }
        }));
    }

     // call this function on tick icon click to line through and decrese opacity of selected todo
    const taskDone = (id , state) => {
        state ? currentToDoArray[id].taskState = false : currentToDoArray[id].taskState = true;
                setToDoarray(currentToDoArray); 
        state ? setStateUpdate(false)  : setStateUpdate(true);
    }

    const taskEdited = (id , editedTaskObject) => {
        currentToDoArray[id].todo = editedTaskObject.todoEditedText;
        currentToDoArray[id].time = editedTaskObject.todoEditedTime;
        currentToDoArray[id].date = editedTaskObject.todoEditedDate;
        setToDoarray(currentToDoArray);
        isTodoUpdated ? setTodoUpdated(false)  : setTodoUpdated(true);
    }
  
    
    return(
        <div id="body">
            <div id="content-container">
                <form id="input-container" onSubmit = {(e) => {e.preventDefault()}}>
                    <input id="task-input-field" onChange = {(e) => {e.preventDefault();
                        setTodo(e.target.value);
                        }} value= {currentTodo} type="text" placeholder="Add To-Do Task Here..." maxLength={50} />
                    <div id="date-time-container">
                        <div>
                            <input type="date" onChange = {(e) => {setDate(e.target.value)}} value={currentDate}/>
                            <input type="time" onChange = {(e) => {setTime(e.target.value)}} value={currentTime}/>
                        </div>
                         <button id="add" type="submit" onClick={getToDo}><a>+</a></button>
                    </div>
                   
                </form>
                <ol id="list-container">
                    {
                        currentToDoArray.map( (li,index) => {
                            if(index !== 0){
                                return(<Li key={index} 
                                           id={index} 
                                           state = {li.taskState}
                                           name = {`${li.todo} ${index}`}
                                           onDelete = {taskDelete} 
                                           onTaskDone = {taskDone} 
                                           onTaskEdit = {taskEdited}
                                           children={[li.todo,li.date,li.time]}
                                        />)
                            }
                        })
                    
                       }
                </ol>
            </div>
           
        </div>
    )
}

export default Body;