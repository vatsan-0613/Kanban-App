import Header from "./Header"
import Card from "./Card"
import React from "react";


export default function App(){

  const [board, setBoard] = React.useState({
    todo : [],
    doing : [],
    done : []
  })
  
  const [isDataFetched, setDataFetched] = React.useState(false);

  React.useEffect(() => {
    fetch("https://kanban-backend-epgo.onrender.com/api/getData")
      .then((response) =>{
        return response.json();
      })
      .then((data) =>{
        setBoard(data[0]);
        setDataFetched(true);
      });
  }, []);

  const updateCard = (cardName, updatedTasks) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      [cardName]: updatedTasks,
    }));
  };
  
  console.log(board)

  return(
    <>
      <Header />
      {isDataFetched &&
      <div className="cards mt-5">
      <Card  tasks = {board.todo} cardName={'Todo'} updateCard={updateCard}/>
      <Card  tasks = {board.doing} cardName={'Doing'} updateCard={updateCard}/>
      <Card  tasks = {board.done} cardName={'Done'} updateCard={updateCard}/>
      </div>
      }
    </>
    
  )
}



