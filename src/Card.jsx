import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import TaskModel from "./TaskModel";
import ModalForm from "./ModalForm";

export default function Card(props) {

  const [tasks, setTasks] = React.useState(props.tasks);
  const [showAdd, setShowAdd] = React.useState(true);
  const [newItem, setNewItem] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [formModalShow, setformModalShow] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [formTitle, setFormTitle] = React.useState("");
  const [formDesc, setFormDesc] = React.useState("");


  const handlePopup = (item)=>{
    setTitle(item.title);
    setDesc(item.desc);
    setModalShow(true);
  }

  const handleFormModalShow = (item)=>{
    setFormTitle(item.title);
    setFormDesc(item.desc);
    setformModalShow(true);
  }

  const openSection = () => {
    setShowAdd(false);
  };

  const handleAdd = (event) =>{
    setNewItem(event.target.value);
  }

  const handleClick = () =>{
    if(newItem){
      const updatedTasks = [...tasks, {title : newItem, description : ""}];
    setTasks(updatedTasks);
    props.updateCard(props.cardName, updatedTasks);
    setNewItem('');
    setShowAdd(true);
    fetch("https://kanban-web-app.onrender.com/api/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        // Add any other headers your API requires
      },
      body: JSON.stringify({title : newItem, section : props.cardName}), // Convert the data object to JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        // Handle the response data
        console.log('Response data:', data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
    }
  }

  const handleEdit = (task, toEdit) =>{
    const updatedTasks = tasks.map(item =>{
      return(
        item.title === toEdit ? task : item
      )
    })
    setTasks(updatedTasks);
    props.updateCard(props.cardName, updatedTasks);

    fetch(`https://kanban-web-app.onrender.com/api/edit/${props.cardName}/${toEdit}`, {
      method: 'PUT', // You can also use 'PATCH' if it's a partial update
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your API requires
      },
      body: JSON.stringify({title : task.title, desc : task.desc}), // Send the updated task data to the server
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // If the server sends a response, you can handle it here
      })
      .then(data => {
        // Handle the response data if needed
        console.log('Response data:', data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  }

  const handleDelete = (taskName) => {
    // Find the index of the task to be deleted
    const taskIndexToDelete = tasks.findIndex(task => task.title === taskName);
  
    if (taskIndexToDelete === -1) {
      // Task not found, handle this case as needed
      return;
    }
  
    // Create a copy of the tasks array without the deleted task
    const updatedTasks = [...tasks.slice(0, taskIndexToDelete), ...tasks.slice(taskIndexToDelete + 1)];
  
    // Update the state to reflect the change
    setTasks(updatedTasks);
    props.updateCard(props.cardName, updatedTasks);
  
    // Send a request to the server to update the board (assuming you have a route for this)
    fetch(`https://kanban-web-app.onrender.com/api/board/${props.cardName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your API requires
      },
      body: JSON.stringify({ taskName : taskName }), // Send the task name to identify the task to delete
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // If the server sends a response, you can handle it here
      })
      .then(data => {
        // Handle the response data if needed
        console.log('Response data:', data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  };
  

  const cardElements = tasks.map(item =>{
    return(
        <div className="item" key={item.title} onClick={()=> handlePopup(item)}>
        <p>{item.title}</p>
        <div>
          <FontAwesomeIcon icon={faPenToSquare} className="me-3 edit-icon" onClick={(e) => {
          e.stopPropagation(); 
          handleFormModalShow(item); 
        }}/>
          <FontAwesomeIcon  className="trash" icon={faTrash} onClick={(e) => {
          e.stopPropagation(); 
          handleDelete(item.title); 
        }}/>
        </div>
        </div>
    )
  })

  return (
     <>
      <div className="card" style={{height: "fit-content"}}>
      <h4 className="card-title">{props.cardName}</h4>
      {cardElements}
      {showAdd &&<button className="add-button btn btn-info" onClick={openSection}>
        Add Item
      </button>}

      {!showAdd &&
         <div className="add-sec">
          <input type="text" className="form-control" value={newItem} placeholder="add item" onChange={handleAdd}/>
          <button className="btn btn-primary mt-3" onClick={handleClick}>add task</button>
         </div> 
      }
      
    </div>

      <TaskModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        title = {title}
        desc = {desc}
      />
      <ModalForm 
        show={formModalShow}
        onHide={() => setformModalShow(false)}
        title = {formTitle}
        desc = {formDesc}
        handleEdit = {handleEdit}
      />
    </>
  );
}



