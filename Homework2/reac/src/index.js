import React from 'react';
import ReactDOM from 'react-dom';
// import './App.css'
import "./Style1.scss"
// import styles from './MyStyle.css';
// import  { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


class MyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            age: null,
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let name = this.state.username;
        let age = this.state.age;
        if (name == ""){
            alert("لطفا نام خود را وارد کنید")
        }
        if (age == ""){
            alert("لطفا سن خود را وارد کنید")
        }
        if (!Number(age)) {
            alert("سن را به صورت عدد وارد کنید");
        }
        if (age<0 || age > 120){
            alert("سن باید بین 0 تا 120 باشد")
        }
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    render() {
        return (
            <div>
                <h1 style={{fontFamily: "SansFont",textAlign: "center"}}>تمرین چهارم مهندسی اینترنت</h1>
                <h1 style={{fontFamily: "NazaninFont",textAlign:"center"}}>متین برهانی - 9526703</h1>
                <form onSubmit={this.mySubmitHandler} dir="rtl">
                    <h1>سلام  {this.state.username}</h1>
                    <p>نام خود را وارد کنید:</p>
                    <input
                        type='text'
                        name='username'
                        onChange={this.myChangeHandler}
                    />
                    <p >سن خود را وارد کنید:</p>
                    <input
                        type='text'
                        name='age'
                        onChange={this.myChangeHandler}
                    />
                    <br/>
                    <br/>
                    <input type='submit' class="button-submit"  value= "تایید" />
                </form>
            </div>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));