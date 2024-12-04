import { Todo } from "../types";
import { completedTodos, dateSortedTodos } from "../utils";

interface NavProps {
  allTodos: Todo[];
  listName: string;
  setSelectedList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setListName: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = ({
  allTodos,
  listName,
  setSelectedList,
  setListName,
}: NavProps) => {
  const handleClick = (list: Todo[], name: string) => {
    setSelectedList(list);
    setListName(name);
  };

  const completed = completedTodos(allTodos)

  return (
    <div>
      <input type="checkbox" id="sidebar_toggle" />
      <div id="sidebar">
        <section id="all">
          <div id="all_todos">
            <header id="all_header" className={"All Todos" === listName ? "active" : ""} >
                <dl
                  onClick={() => handleClick(allTodos, "All Todos")}
                >
                  <dt>
                    <time>All Todos</time>
                  </dt>
                  <dd>{allTodos.length}</dd>
                </dl>
            </header>
          </div>
          <article id="all_lists">
            {dateSortedTodos(allTodos).map((group) => {
              const date = Object.keys(group)[0];
              const list = group[date]
              return (
                <dl
                  key={date}
                  className={date === listName ? "active" : ""}
                  onClick={() => handleClick(list, date)}
                >
                  <dt>
                    <time>{date}</time>
                  </dt>
                  <dd>{list.length}</dd>
                </dl>
              );
            })}
          </article>
        </section>
        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <header
              id="all_done_header"
              className={"Completed" === listName ? "active" : ""} >
              <dl
                onClick={() => handleClick(completed, "Completed")}
              >
                <dt>
                  <time>Completed</time>
                </dt>
                <dd>{completed.length}</dd>
              </dl>
          </header>
          </div>
          <article id="completed_lists">
          {dateSortedTodos(completed).map((group) => {
              const date = Object.keys(group)[0];
              const list = group[date]
              const formattedName = `${date} done`
              return (
                <dl
                  key={date}
                  className={formattedName === listName ? "active" : ""}
                  onClick={() => handleClick(list, formattedName)}
                >
                  <dt>
                    <time>{date}</time>
                  </dt>
                  <dd>{list.length}</dd>
                </dl>
              );
            })}
          </article>
        </section>
      </div>
    </div>
  );
};

export default Nav;
