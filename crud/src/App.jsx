import React from "react";
import Form from "./components/Form/Form";
import Note from "./components/Note/Note";
function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return reject(data);
        }
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    fetch(url, {...{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    })
      .then((response) => { 
        return response.json()})
      .then((data) => {
        if (!data) {
          return reject(data);
        }
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function del(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: "delete" })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return reject(data);
        }
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      form: { text: 'rrrr' },
    }
    this.formChangeHandler = this.formChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.deleteClickHandler = this.deleteClickHandler.bind(this);
  }
  getNotes() {
    get('http://localhost:7777/notes/')
    .then((data) => {
      this.setState({ notes: data });
    })
  }
  componentDidMount() {
    this.getNotes();
  }

  componentDidUpdate(__, prevState) {
    if (this.state.notes.length > prevState.notes.length) {
      window.scrollTo(0, window.outerHeight);
    }
  }

  formChangeHandler({ target }) {
    const { name, value } = target;

    this.setState({form: { ...this.state.form, [name]: value }});
  }

  formSubmitHandler(form) {
    post('http://localhost:7777/notes/', { text: form.text })
      .then((data) => {
        this.setState({ notes: data });
      })
    this.setState({ form: { text: '' } });
  }

  deleteClickHandler(id) {
    del(`http://localhost:7777/notes/${id}`, { text: this.state.form.text })
      .then((data) => {
        this.setState({ notes: data });
      })
  }

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Notes</h1>
          <button onClick={()=>this.getNotes()}> 	&#128257; </button>
          <div className="App-notes-container">
            {this.state.notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  onDeleteClick={() => this.deleteClickHandler(note.id)}
                />
              );
            })}
          </div>
          <Form
            onSubmit={this.formSubmitHandler}
            onChange={this.formChangeHandler} 
            form={this.state.form}
          />
        </div>
    );
  }
}

export default App;
