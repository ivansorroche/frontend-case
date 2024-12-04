import { useState, useEffect, ChangeEvent } from "react";

import logoImage from "../assets/logo.svg";
import { TODO_LIST } from "./initial-state";
import { ITodoTypes } from "./types";

import "./index.css";

function Todo() {
  const [items, setItems] = useState(TODO_LIST);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearch = (event:any) => {
    event.preventDefault();
    const itemFiltered = items.filter((item) => item.title.includes(searchInputValue))

    setItems(itemFiltered)
  };

  const handleDeleteTask = (id: string) => {
    const newList = items.filter((item) => item.id !== id)
    setItems(newList)
  };

  const handleChangeTaskStatus = (title: string, status: ITodoTypes) => {
    setItems((prevList) =>
      prevList.map((item) =>
        item.title === title ? { ...item, status: status === 'pending' ? 'done' : 'pending' } : item
      )
    )
  };

  useEffect(() => {
    if ( searchInputValue === '') {
      setItems(TODO_LIST)
    } 

  }, [searchInputValue]);

  return (
    <main id="page" className="todo">
        <img src={logoImage} alt="Cora" title="Cora"></img>
        <h1>Weekly to-do list &#128467;</h1>
        <h2>
          Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
        </h2>
        <p>
          Marque como{" "}
          <strong>
            <u>done</u>
          </strong>{" "}
          as tasks que você conseguir concluir (elas já precisam renderizar com
          o status <strong>done</strong>)
        </p>
        <p className="disclaimer">
          Items obrigatórios marcados com arteristico (<strong>*</strong>)
        </p>
        <div className="todo__wrapper">
          <form className="todo__search" onSubmit={handleSearch}>
            <input
              id="search"
              placeholder="busca por texto..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button type="submit">buscar</button>
          </form>


          <ul className="todo__list">
            {items.length === 0 && (
              <span>
                <strong>Ops!!!</strong> Nenhum resultado foi encontrado
                &#128533;
              </span>
            )}
            {items.map((item:any, i) => {
              return (
                <li>
                  <span>
                    {i + 1}
                    {item.required ? "*" : ""}.
                  </span>
                  <div className="todo__content">
                    <h3>
                      {item.title}
                      <span data-type={item.status}>{item.status}</span>
                    </h3>
                    <p>{item.description}</p>
                    {item.links && item.links.length > 0 && (
                      <div className="todo__links">
                        {item.links.map((link:any) => (
                          <a key={link.name} target="_blank" href={link.url}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="todo__actions">
                      <button onClick={() => handleDeleteTask(item.id)}>
                        delete
                      </button>
                      <button
                        onClick={() =>
                          handleChangeTaskStatus(item.title, item.status)
                        }
                      >
                        change to{" "}
                        <strong>
                          <u>{item.status === "done" ? "pending" : "done"}</u>
                        </strong>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
    </main>
  );
}

export default Todo;
