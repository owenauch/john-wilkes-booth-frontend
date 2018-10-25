import React, { Component } from 'react';
import logo from './overflow-01.png';
import './App.css';
import axios from "axios"

import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Countdown from "./Countdown"

class App extends Component {
  state = {
    name: '',
    targetInfo: null
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleButtonClick = event => {
    const url = "https://api-dot-overflow-assassins.appspot.com/" + this.state.name
    axios.get(url, {crossdomain: true})
    .then((response) => {
      console.log(response)
      this.setState({ targetInfo: response.data })
    })
    .catch((error) => {
      console.log(error)
      this.setState({ targetInfo: {
        target: "Error: our website is busy teaching robots how to love.",
        catchphrase: "N/A",
        target_pic: "https://media.giphy.com/media/3kFkjoddRSOMXVxAHI/giphy.gif",
        inactive_limit: null
      }})
    })
  };

  render() {
    return (
      <div className="Main" style={{backgroundColor: "black", height: "110%", minHeight: "110%"}}>
        <div className="spacer" />
        <Paper className="App-header" style={{backgroundColor: "#B8B8B8"}}>
          <div className="App">
            <img
              alt="Logo"
              src={logo}
              className="logo"
              style={{maxWidth: "70%", height: "auto"}}
            />
            <Typography component="h1" variant="h3" style={{color: "#cc0000", marginBottom: ".8em", marginTop: "-.8em", fontSize: "2.5em"}}>
              Do you thirst for blood (or friendship)?
            </Typography>
            <Typography component="h1" variant="h4" style={{fontSize: "2em"}}>
              Enter a codename below to find your target:
            </Typography>
            <Input className="codename-input" value={this.state.name} onChange={this.handleChange} placeholder="Codename" style={{fontSize: "2em", width: "70%"}}/>
            <Button onClick={this.handleButtonClick} style={{backgroundColor: "black", color: "white", fontSize: "1.1em"}}>
              Show me who to kill
            </Button>
            <Typography component="p" style={{color: "#003366", fontSize: "1.8em", marginTop: ".4em"}}>
              <a href="https://docs.google.com/document/d/1vGcrz1D3qGNdcXiEm3CwX27Xg16qfwx9V2FhBx-dIoU" style={{color: "#cc0000"}}>Click here for rules document <span role="img" aria-label="page with curl">📃</span></a>
            </Typography>
            <Typography component="p" style={{color: "#003366", fontSize: "1.8em", marginTop: ".4em"}}>
              <a href="https://docs.google.com/spreadsheets/d/1EoWj-CH21XUI3TzCnrPzJlQW4gzCst89yhj4eNwR4hM" style={{color: "#cc0000"}}>Click here for info on other players <span role="img" aria-label="detective">🕵️</span></a>
            </Typography>
            {this.state.targetInfo && <Paper className="targetInfoCard"
              style={{backgroundColor: "black", color: "white", padding: "1.5em", marginTop: "1em"}}
            >
              <Typography component="h1" variant="h4" style={{color: "white", fontSize: "2.5em"}}>
                Target: <strong style={{color: "#cc0000"}}>{this.state.targetInfo.target}</strong>
              </Typography>
              <Typography component="h1" variant="h5" style={{color: "white", margin: ".4em", fontSize: "1.5em"}}>
                Catchphrase: <strong style={{color: "#cc0000"}}>"{this.state.targetInfo.catchphrase}"</strong>
              </Typography>
              {this.state.targetInfo.inactive_limit && <Typography component="h1" variant="h5" style={{color: "white", margin: ".5em", fontSize: "1.5em"}}>
                Time Remaining in Round: <strong style={{color: "#cc0000"}}><Countdown date={this.state.targetInfo.inactive_limit} /></strong>
              </Typography>}
                <img
                  alt="Target"
                  src={this.state.targetInfo.target_pic}
                  style={{maxWidth: "85%", height: "auto"}}
                />
            </Paper>}
            <Typography component="p" style={{color: "#003366", fontSize: "1em", marginTop: "1.6em"}}>
              This app brought to you by <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{textDecoration: "none", color: "#003366"}}>Absolute Unit Labs <span role="img" aria-label="eyes">👀</span></a>
            </Typography>
          </div>
        </Paper>
        <div className="spacer" />
      </div>
    );
  }
}

export default App;
