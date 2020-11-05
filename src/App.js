
import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      table: [
        { name: "Table1", sits: 5, status: "Available" },
        { name: "Table2", sits: 9, status: "Available" },
        { name: "Table3", sits: 8, status: "Available" },
        { name: "Table4", sits: 5, status: "Available" },
        { name: "Table5", sits: 9, status: "Available" },
        { name: "Table6", sits: 8, status: "Available" },
      ],
      search: null,
      tableName: "",
      sits: "",
    };
  }
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword })
  }
  addTable = (event) => {
    event.preventDefault()
    console.log("hello");
    this.setState(state => {
      return state.table.push({ name: this.state.tableName, sits: this.state.sits, status: "Available" })
    })
  }
  bookHandler = (props) => {
    const elementsIndex = this.state.table.findIndex(element => element.name == props.name)
    let newArray = [...this.state.table]
    newArray[elementsIndex] = { ...newArray[elementsIndex], status: "Booked" }
    this.setState({
      table: newArray,
    });
  }
  bookTable = (data) => {
    if (window.confirm('Are you sure, You want to book this table?')) { this.bookHandler(data) };
  }
  render() {
    const items = this.state.table.filter((data) => {
      if (this.state.search == null)
        return data
      else if (data.name.includes(this.state.search) | data.sits.toString().includes(this.state.search)) {
        return data
      }
    }).map(data => {
      return (
        <div class="card" style={{ width: "250px", margin: "10px" }}>
          <div class="card-body">
            <h5 class="card-title">{data.name}</h5>
            <p class="card-text">No of Sits:{data.sits}</p>
            <p class="card-text">Status: <span style={{ color: data.status === "Available" ? "#009287" : "red" }}>{data.status}</span></p>
            <button type="button" onClick={() => this.bookTable(data)} class="btn btn-primary" >Book Now</button>
          </div>
        </div>
      )
    })
    return (
      <div class="container" >
        <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>Restaurant Management System</p>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto"> </ul>
              <button type="button" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Table</button>
            </div>
          </nav>
        </header>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Table</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Table Name:</label>
                    <input type="text" name="tableName" class="form-control" value={this.state.tableName} onChange={(e) => this.setState({ tableName: e.target.value })} required />
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label" >No of sits:</label>
                    <input type="text" class="form-control" value={this.state.sits} onChange={(e) => this.setState({ sits: e.target.value })} />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={(e) => this.addTable(e)} class="btn btn-primary" data-dismiss="modal">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <input class="form-control mr-sm-2" type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />
          <h5 style={{ margin: "20px" }}>Table Listing</h5>
          <div class="row" >
            {items}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
