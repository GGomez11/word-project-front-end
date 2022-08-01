import React, {useState} from 'react'
import axios from 'axios'
import '../css/Form.css'

function DeleteWordForm(props){
    const [word, setWord] = useState(' ')

    /**
     * JSON for delete request
     */
    let options = {
        method: 'DELETE',
        url: 'http://localhost:5000/words/'+word,
    } 

    /** 
     * Handles submit event
     * Make a delete request to my API
    */
    const handleSubmit = (e) => {
        axios.request(options)
            .then(res => {
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