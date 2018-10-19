import React, { Component } from 'react';
import logo from './overflow-01.png';
import './App.css';
import axios from "axios"

import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

class App extends Component {
  state = {
    name: '',
    targetInfo: null
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleButtonClick = event => {
    const url = "https://still-oasis-87334.herokuapp.com/" + this.state.name
    axios.get(url, {crossdomain: true})
    .then((response) => {
      console.log(response)
      this.setState({ targetInfo: response.data })
    })
    .catch((error) => {
      console.log(error)
      this.setState({ targetInfo: {
        target: "Error: our website is busy teaching robots how to love.",
        code: "N/A",
        target_pic: "https://media.giphy.com/media/3kFkjoddRSOMXVxAHI/giphy.gif"
      }})
    })
  };

  render() {
    return (
      <div className="Main" style={{backgroundColor: "black", height: "2000px"}}>
        <div className="spacer" />
        <Paper className="App-header" style={{backgroundColor: "#B8B8B8"}}>
          <div className="App">
            <img
              alt="Logo"
              src={logo}
              className="logo"
            />
            <Typography component="h1" variant="h3" style={{color: "#D00000", marginBottom: "20px", marginTop: "-10px"}}>
              Do you thirst for blood?
            </Typography>
            <Typography component="h1" variant="h4">
              Enter a codename below to find your target:
            </Typography>
            <Input className="codename-input" value={this.state.name} onChange={this.handleChange} placeholder="Codename" style={{fontSize: "20pt"}}/>
            <Button onClick={this.handleButtonClick} style={{backgroundColor: "black", color: "white", fontSize: "15pt"}}>
              Show me who to kill
            </Button>
            {this.state.targetInfo && <Paper className="targetInfoCard" style={{backgroundColor: "black", color: "white", padding: "50px"}}>
              <Typography component="h1" variant="h4" style={{color: "white"}}>
                {this.state.targetInfo.target}
              </Typography>
              <Typography component="h1" variant="h5" style={{color: "white", margin: "10px"}}>
                Codename: {this.state.targetInfo.code}
              </Typography>
                <img
                  alt="Target Image"
                  src={this.state.targetInfo.target_pic}
                  style={{maxHeight: "500px"}}
                />
            </Paper>}
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
