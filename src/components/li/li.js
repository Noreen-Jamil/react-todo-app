import React, { useState }  from "react";
import "./li.css";

const Li =(props) => {
    const [hideShowDivs , setHideShowDivs] = useState("block");
    const [hideShowInputFields ,setHideShowInputFields] = useState("none");
    const [hideShowTaskIcons ,setHideShowTaskIcons] = useState("block");
    let hrStyle = "none";
    let applyOpacity = 1;
    let [todoEditedText , setTodoEditedText] = useState(props.children[0]);
    let [todoEditedTime , setTodoEditedTime] = useState(props.children[1]);
    let [todoEditedDate , setTodoEditedDate] = useState(props.children[2]);
    // const [taskState , setTaskState] = useState(props.state);
    
    if(props.state === true)
        {   
           applyOpacity = 0.4;
           hrStyle = "block";
        }else{
            applyOpacity = 1;
            hrStyle = "none";
        }

    const editedTodo = (onTaskEdit , id) => {
        const editedTodoDetails = {
            todoEditedText,
            todoEditedDate,
            todoEditedTime
        }
      
        setHideShowInputFields("none");
        setHideShowDivs("block");
        setHideShowTaskIcons("block");
        onTaskEdit(id,editedTodoDetails);
    }

    const hideShow = () =>{
        if(hideShowDivs === "block" && hrStyle === "none" ){
            setHideShowInputFields("block");
            setHideShowTaskIcons("none");
            setHideShowDivs("none");
        }
    }
    const taskDone = (taskDone, id, state) => {
        // taskState ? setTaskState(false) : setTaskState(true);
        taskDone(id,state);
    }
 
    return (
        <li name = {props.name}>
            <div id="li-content-container" style = {{opacity : applyOpacity}}>
                <hr style = {{display : hrStyle}}/>
                <i className="fas fa-check done" style = {{display : hideShowTaskIcons}} onClick= {(e) => {e.preventDefault();
                    taskDone(props.onTaskDone,props.id ,props.state)}}></i>
                <div className="to-do-detail-container" title="click to edit" style = {{display : hideShowDivs}} onClick = {hideShow}  >
                    <span >{props.children[0]}</span>
                    <div className="date-time-container-list">
                        <span>{props.children[1]}</span>
                        <span>{props.children[2]}</span>
                    </div>
                </div>
                <div className="to-do-edit-container" style = {{display : hideShowInputFields}}>
                    <input className="to-do-text" type ="text" maxLength = {50} value={todoEditedText} onChange = {(e) => {e.preventDefault();
                        setTodoEditedText(e.target.value)} } />
                    <div className="date-time-edit-container">
                        <input className="to-do-date" type ="date" value={todoEditedDate} onChange = {(e) => {
                            e.preventDefault();
                            setTodoEditedDate(e.target.value)
                        } } />
                        <input className="to-do-time" type ="time" value={todoEditedTime} onChange = {(e) => {
                            e.preventDefault();
                            setTodoEditedTime(e.target.value);
                        } } />
                        <button className = "done" onClick = {() => {editedTodo(props.onTaskEdit ,props.id)}}>Done</button>
                    </div>
                    
                </div>
                <i className="fas fa-times delete" style = {{display : hideShowTaskIcons}}  onClick = {() => {props.onDelete(props.id)}}></i>
             </div>
         </li>
    )
}

export default Li;
