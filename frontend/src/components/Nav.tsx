
const Nav = () => {  
  return (
    <div>
    <input type="checkbox" id="sidebar_toggle"/>
    <div id="sidebar" >
      <section id="all">
        <div id="all_todos">
        <header data-title="All Todos" id="all_header" className="active">
              <dl>
                <dt>All Todos</dt>
                <dd>X</dd>
              </dl>
            </header>
        </div>
        <article id="all_lists">
          <dl data-title="key">
            <dt><time>date</time></dt>
            <dd>X</dd>
          </dl>
        </article>
      </section>
      <section className="completed" id="completed_items">
        <div id="completed_todos">
          <header data-title="Completed" data-total="LENGTH" id="all_done_header">
            <dl>
            <dt>Completed</dt>
            <dd>X</dd>
            </dl>
          </header>
        </div>
        <article id="completed_lists">
          <dl data-title="KEY" data-total="3" id="KEYe">
            <dt><time>date</time></dt>
            <dd>X</dd>
          </dl>
        </article>
      </section>
    </div>
    </div>
  )
}

export default Nav