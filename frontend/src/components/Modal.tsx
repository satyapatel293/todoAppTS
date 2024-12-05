import React, { useState } from "react";
import todoServices from "../services/todo";
import { NewTodo, Todo, UpdatedTodo } from "../types";
import { formatNewTodo } from "../utils";

interface ModalProps {
  allTodos: Todo[];
  selectedTodo: Todo | null;
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedList: React.Dispatch<React.SetStateAction<Todo[]>>
  setListName: React.Dispatch<React.SetStateAction<string>>
}

const Modal = ({
  allTodos,
  selectedTodo,
  setSelectedTodo,
  setAllTodos,
  setModalStatus,
  setSelectedList,
  setListName
}: ModalProps) => {
  const [title, setTitle] = useState(selectedTodo ? selectedTodo.title : "");
  const [description, setDescription] = useState(selectedTodo ? selectedTodo.description : "");
  const [day, setDay] = useState(selectedTodo ? selectedTodo.day : "  ");
  const [month, setMonth] = useState(selectedTodo ? selectedTodo.month : "  ");
  const [year, setYear] = useState(selectedTodo ? selectedTodo.year : "    ");

  const exitModal = () => {
    setModalStatus(false);
    setSelectedTodo(null);
  };

  const updateExistingTodo = () => {
    if (selectedTodo === null) return;
    const updatedTodoData: UpdatedTodo = {
      title,
      description,
      day,
      month,
      year,
    };

    todoServices
      .updateTodo(selectedTodo.id, updatedTodoData)
      .then((updatedTodo) => {
        setAllTodos(allTodos.map((todo) => todo.id === selectedTodo.id ? updatedTodo : todo))
        setSelectedList(selectedList => selectedList.map((todo) => todo.id === selectedTodo.id ? updatedTodo : todo))
      });
    exitModal();
  };

  const addNewTodo = () => {
    const newTodoData: NewTodo = formatNewTodo({
      title,
      description,
      day,
      month,
      year,
    });

    if (newTodoData.title.trim().length < 3) {
      alert('You must enter a title at least 3 characters long.')
      return
    }

    todoServices
      .addTodo(newTodoData)
      .then((newTodo) => {
        setAllTodos([...allTodos, newTodo])
        setSelectedList([...allTodos, newTodo])
        setListName('All Todos')
      });  
    exitModal();
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (selectedTodo) {
      updateExistingTodo();
    } else {
      addNewTodo();
    }
  };

  const handleMarkComplete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedTodo) {
      todoServices
        .toggleCompleteTodo(selectedTodo.id, true)
        .then((updatedTodo) => {
          setAllTodos(allTodos.map((todo) => todo.id === selectedTodo.id ? updatedTodo : todo))
          setSelectedList(selectedList => selectedList.map((todo) => todo.id === selectedTodo.id ? updatedTodo : todo))
        });
      exitModal();
    } else {
      alert("Cannot mark as complete as item has not been created yet!");
    }
  };

  return (
    <>
      <div className="modal" id="modal_layer" onClick={exitModal}></div>
      <div className="modal" id="form_modal">
        <form action="" method="post" onSubmit={handleSubmit}>
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Item 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select
                    id="due_day"
                    name="due_day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value="  ">Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>{" "}
                  /
                  <select
                    id="due_month"
                    name="due_month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="  ">Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>{" "}
                  /
                  <select
                    id="due_year"
                    name="due_year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="    ">Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  cols={50}
                  name="description"
                  rows={7}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <input type="submit" value="Save" />
                <button name="complete" onClick={handleMarkComplete}>
                  Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Modal;
