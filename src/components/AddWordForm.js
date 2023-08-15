import React, {useState} from 'react'
import axios from 'axios'
import '../css/Form.css'

function AddWordForm(props){
    const [word, setWord] = useState(' ')

    /** JSON passed into the API for the request */
    let options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/'+word,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    }

    const handleSubmit = (e) => {
        const token = localStorage.getItem('jwt')
        const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')

        axios.post('http://localhost:5000/words/word',{
            word: word
        },{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': encodedString
        }})
        .then(res => {
            e.target.reset()
            if (res.data.isAdded){
                props.getWords()
            }
            console.log(res)  
        })
        .catch(err => {
            e.target.reset()
            console.log(err)
        }) 

        e.preventDefault()
    }

    /** Handles when user types into the form */
    const handleInput = (e) => {
        setWord(e.target.value)
    }

    return(
        <div>
            <form className="form-style" onSubmit={handleSubmit}> 
                <label>Add A Word</label>
                <br/>
                <input type="text" className="text-input" onChange={handleInput}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default AddWordForm