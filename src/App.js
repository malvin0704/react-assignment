import "./styles.css";
import React, { Component } from "react";
import { v4 as uuid } from "uuid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterChecked: true,
      tdListChecked: true
    };
  }
  handleCounterChecked = (e) => {
    this.setState({
      ...this.state,
      counterChecked: !this.state.counterChecked
    });
    console.log(this.state.counterChecked);
  };
  handleTdLinkChecked = (e) => {
    this.setState({ ...this.state, tdListChecked: !this.state.tdListChecked });
    console.log(this.state.tdListChecked);
  };
  render() {
    return (
      <div className="App">
        <div>
          <label htmlFor="counter">
            Counter
            <input
              type="checkbox"
              id="counter"
              defaultChecked={this.state.counterChecked}
              onChange={this.handleCounterChecked}
            />
          </label>
          <label htmlFor="tdList">
            TdList
            <input
              type="checkbox"
              id="tdList"
              defaultChecked={this.state.tdListChecked}
              onChange={this.handleTdLinkChecked}
            />
          </label>
        </div>
        {this.state.counterChecked && (
          <Counter state={this.state} handleChecked={this.handleChecked} />
        )}
        {this.state.tdListChecked && <TdList />}
      </div>
    );
  }
}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      timer: null
    };
  }
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  handleIncIfOdd = () => {
    this.state.count % 2 === 1 &&
      this.setState({ count: this.state.count + 1 });
  };
  handleAsyncIncrement = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };
  timerStart = () => {
    this.setState({
      timer: setInterval(() => {
        this.setState({ count: this.state.count + 1 });
      }, 1000)
    });
    let startBtn = document.querySelector("#timer-start");
    let stopBtn = document.querySelector("#timer-stop");
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
  };
  timerStop = () => {
    clearInterval(this.state.timer);
    let startBtn = document.querySelector("#timer-start");
    let stopBtn = document.querySelector("#timer-stop");
    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
  };
  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button className="btn" onClick={this.handleIncrement}>
          Increment
        </button>
        <button className="btn" onClick={this.handleDecrement}>
          Decrement
        </button>
        <div>
          <button className="btn" onClick={this.handleIncIfOdd}>
            Increment-If-Odd
          </button>
          <button className="btn" onClick={this.handleAsyncIncrement}>
            Async-Increment
          </button>
        </div>
        <div>
          <button
            id="timer-start"
            className="timer-btn"
            onClick={this.timerStart}
          >
            Start
          </button>
          <button
            id="timer-stop"
            className="timer-btn"
            onClick={this.timerStop}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}

class TdList extends Component {
  state = {
    todoList: [],
    input: ""
  };
  handleOnChange = (e) => {
    this.setState({
      input: e.target.value
    });
    console.log(this.state.input);
  };
  addTodo = () => {
    const newTodoList = [
      ...this.state.todoList,
      { id: uuid(), todo: this.state.input }
    ];
    this.setState({
      todoList: newTodoList,
      input: ""
    });
  };
  deleteTodo = (id) => {
    const newTodoList = this.state.todoList.filter((item) => {
      return item.id !== id;
    });
    this.setState({ ...this.state, todoList: newTodoList });
  };
  handleChange = (e) => {
    console.log(e.target.value);
    e.target.value === "Z-A"
      ? this.setState({
          ...this.state,
          todoList: this.state.todoList.sort((x, y) =>
            x.todo < y.todo ? 1 : x.todo > y.todo ? -1 : 0
          )
        })
      : this.setState({
          ...this.state,
          todoList: this.state.todoList.sort((x, y) =>
            x.todo > y.todo ? 1 : x.todo < y.todo ? -1 : 0
          )
        });
    console.log(this.state.todoList);
  };
  render() {
    return (
      <div>
        <Inputfield
          todoList={this.state.todoList}
          input={this.state.input}
          handleOnChange={this.handleOnChange}
          addTodo={this.addTodo}
        />
        <ItemList todoList={this.state.todoList} deleteTodo={this.deleteTodo} />
        <DropDown handleChange={this.handleChange} />
      </div>
    );
  }
}
const Inputfield = (props) => {
  const { input, handleOnChange, addTodo } = props;
  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="add an todo"
        onChange={handleOnChange}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

const ItemList = (props) => {
  const { todoList, deleteTodo } = props;
  return (
    <ul>
      {todoList.map((item) => {
        return <Item key={item.id} item={item} deleteTodo={deleteTodo} />;
      })}
    </ul>
  );
};
const DropDown = (props) => {
  const { handleChange } = props;
  return (
    <div>
      <label>Choose an order for todos</label>
      <select name="order" onChange={handleChange}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
};

const Item = (props) => {
  const { item, deleteTodo } = props;
  const { todo, id } = item;
  const handleDelete = () => {
    deleteTodo(id);
  };
  return (
    <li className="item-list">
      <span>
        {todo}
        <button onClick={handleDelete}>Delete</button>
      </span>
    </li>
  );
};
