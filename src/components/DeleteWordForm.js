import React, {useState} from 'react'
import axios from 'axios'
import '../css/Form.css'

function DeleteWordForm(props){
    const [word, setWord] = useState(' ')

    const handleSubmit = (e) => {
        const token = localStorage.getItem('jwt')
        const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')
        const apiURL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/words/word' : 'http://localhost:5000/words/word'

        axios.request({
            method: 'DELETE',
            url: apiURL+word,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': encodedString
            }
        }).then(res => {
                props.getWords()
                e.target.reset()
            })
            .catch(err => {
                console.log(err)
                alert("Error, word not found in local database")
                e.target.reset()
            })
        e.preventDefault()
    }

    /** Sets the word state */
    const handleInput = (e) => {
        setWord(e.target.value)
    }

    return(
            <form className="form-style" onSubmit={handleSubmit}> 
                <label>Delete A Word</label><br/>
                <input type="text" className="text-input" onChange={handleInput}/><br/>
                <input type="submit" value="Submit"/>
            </form>
    ) 
}
export default DeleteWordForm 