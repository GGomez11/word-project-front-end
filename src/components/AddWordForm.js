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

    /** 
     * Function to parse the API response 
     * Returns an array of objects
     */
    const parse = (response) => {
        /**
         * Format of the object being sent to database
         * const example = {
         *     word: response.word,
         *     definitions: [{
         *         definition: '',
         *         partsOfSpeech: '',
         *         synonym: [],    
         *     }],
         *     link: ''  
         * }
         */ 

        // Iterate through every definition
        // For each definition, get the part of speech and synonyms for that definition
        let parsedSyn = response.results.map(result => {
            /** Gets synonyms for the given definition, if a synonym for the definition exists  */
            if(result.synonyms){
                var synms = result.synonyms.map(synonym => {
                    return synonym
                })
            }
            /** Returns one object */
            return {definition: result.definition, partsOfSpeech: result.partOfSpeech, synonym: synms}
        })
        /** Returns array of objects */
        return parsedSyn
    }  

    /** 
     * Handles submit event
     * Make a get request to the RapidApi
     * Post the word into my local database
    */
    const handleSubmit = (e) => {
        axios.request(options)
            .then(res => {
                console.log(res.data)
                let parsedData = parse(res.data)
                const token = localStorage.getItem('jwt')
                const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')
                
                axios.post('http://localhost:5000/words',{
                    word: word,
                    definitions: parsedData,
                    link: 'https://translate.google.com/?hl=en&sl=auto&tl=es&text='+word+'&op=translate'
                }, {headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': encodedString
                }})
                .then(res => {
                    e.target.reset()
                    props.getWords()
                    console.log(res)  
                })
                .catch(err => {
                    e.target.reset()
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
                alert(word + " not found in API database")
                e.target.reset()
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