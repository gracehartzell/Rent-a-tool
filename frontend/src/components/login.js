import React, { Component } from 'react';
import createReactClass from 'create-react-class';



let Parent = createReactClass({
    getInitialState: function () {
        return { signup: false, login: true }
    },
    switch(word) {
        var signup, login;
        if (word === "signup") { signup = true; login = false; }
        else { login = true; signup = false; }
        return this.setState({ login: login, signup: signup })

    },
    render: function () {

        var self = this;
        return (
            <div className='login-container'>
                <div id="buttons">
                    <p id="signupButton" onClick={self.switch.bind(null, "signup")} className={self.state.signup ? "yellow" : "blue"}>Sign Up</p>
                    <p id="loginButton" onClick={self.switch.bind(null, "login")} className={self.state.login ? "yellow" : "blue"}> Login</p>
                </div>

                {self.state.signup ? <Signup /> : null}
                {self.state.login ? <Login /> : null}

            </div>

        )


    }
})


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                address: '',
                city: '',
                state: '',
                phone: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = {
            username: this.state.user.username,
            password: this.state.user.password,
            address: this.state.user.address,
            city: this.state.user.city,
            state: this.state.user.state,
            phone: this.state.user.phone
        }

        console.log(form)
        const request = 'http://localhost:8000/signup';
        fetch(request,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(form)
        }).then(function(response) {
            // if(response.status >= 400){
            //     throw new Error("Bad response from server");
            // }
            //console.log(response)
            return response.json();
        }).then(function(data){
            console.log(data)
        })   
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const { user } = this.state;
        return (
            <div>

                <div id="signup">
                    <input type="text" id="first" placeholder="Username" value={this.state.username}
                        onChange={e => this.setState({ user: { ...user, username: e.target.value } })}  />

                    <input type="password" id="last" placeholder="Password" value={this.state.password}
                        onChange={e => this.setState({ user: { ...user, password: e.target.value } })}  />

                    <input type="text" id="address" placeholder="Address" value={this.state.address}
                    onChange={e => this.setState({ user: { ...user, address: e.target.value } })}/>

                    <input type="text" id="city" placeholder="City" value={this.state.city}
                    onChange={e => this.setState({ user: { ...user, city: e.target.value } })}/>

                    <input type="text" id="State" placeholder="State" value={this.state.state}
                    onChange={e => this.setState({ user: { ...user, state: e.target.value } })}/>

                    <input type="integer" id="phone" placeholder="Phone" value={this.state.phone}
                    onChange={e => this.setState({ user: { ...user, phone: e.target.value } })}/>

                    <button id="send" onClick={this.handleSubmit} method='POST'>Send</button>
                </div>
            </div>

        )
    }
}

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: this.state.username,
          password: this.state.password
        };
        const options = {
          method: "GET",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        };
        const request = ("http://localhost:8000/signin", options);
        fetch(request)
        .then(res => console.log(res))
        alert("You are signin");
      }
    
    render() {
        return (
            <div>

                <div id="login">
                    <input type="email" id="email" placeholder="Email"  value={this.state.username}
                     onChange={this.handleChange}/>
                    <input type="password" id="password" placeholder="Password"  value={this.state.password}
                    onChange={this.handleChange}/>
                    <button id="send" onClick={this.handleSubmit} method='GET'>Send</button>
                </div>

            </div>

        )
    }
}


export default Parent;