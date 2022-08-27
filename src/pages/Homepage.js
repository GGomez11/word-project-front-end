import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddWordForm from '../components/AddWordForm'
import WordTable from '../components/WordTable'
import DeleteWordForm from '../components/DeleteWordForm'
import Header from '../components/Header'
import '../css/Homepage.css'

function Homepage(){
    const [words, setWords] = useState([])
    
    /** Axios call to get words from local database */
    const getWords = () => {
        const token = localStorage.getItem('jwt')
        const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')
        
        axios.request({
            method: 'GET',
            url: 'http://localhost:5000/words',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': encodedString
            },
        }).then(function (response) {
            console.log(response.data)
            setWords(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    } 
    
    useEffect(() => {
        getWords()
    },[])
    
    return(
        <div>
            <Header/>
            <div className="formBox">
                <AddWordForm getWords={getWords}/>
                <DeleteWordForm getWords={getWords}/>
                <WordTable words={words}/>
            </div>
        </div>
    )
}
export default Homepage