import { Todo } from "../types";
import { completedTodos, dateSortedTodos } from "../utils";

interface NavProps {
  allTodos: Todo[];
  listName: string;
  setListName: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = ({
  allTodos,
  listName,
  setListName,
}: NavProps) => {

  const completed = completedTodos(allTodos)

  const navLink = (date:string, list:Todo[]) => {
      return (
        <dl
          key={date}
          className={date === listName ? "active" : ""}
          onClick={() => setListName(date)}
        >
          <dt>
            <time>{date.replace(' done', '')}</time>
          </dt>
          <dd>{list.length}</dd>
        </dl>
      );
  }


  return (
    <div>
      <input type="checkbox" id="sidebar_toggle" />
      <div id="sidebar">
        <section id="all">
          <div id="all_todos">
            <header id="all_header" className={"All Todos" === listName ? "active" : ""} >
                {navLink('All Todos', allTodos)}
            </header>
          </div>
          <article id="all_lists">
            {dateSortedTodos(allTodos).map((group) => {
              return navLink(group.date, group.list)
            })}
          </article>
        </section>
        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <header
              id="all_done_header"
              className={"Completed" === listName ? "active" : ""} >
                {navLink('Completed', completed)}
          </header>
          </div>
          <article id="completed_lists">
          {dateSortedTodos(completed).map((group) => {
              const formattedDate = `${group.date} done`
              return navLink(formattedDate, group.list)
            })}
          </article>
        </section>
      </div>
    </div>
  );
};

export default Nav;
