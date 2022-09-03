import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddWordForm from '../components/AddWordForm'
import WordTable from '../components/WordTable'
import DeleteWordForm from '../components/DeleteWordForm'
import Header from '../components/Header'
import '../css/Homepage.css'
import GetStartedModal from '../components/GetStartedModal'
import { Dialog } from '@material-ui/core';

function Homepage(){
    const [words, setWords] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [open, setOpen] = useState(false)

    const checkToken = () => {
        const token = localStorage.getItem('jwt')

        if(token === null) {
            return false;
        } else {
            return true
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

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
            if (!response.data.isValid) {
                console.log(response.data.isValid)
                console.log('not valid response')
                setIsLoggedIn(false)
                setOpen(true)
            } else {
                console.log('valid response')
                setIsLoggedIn(true)
                setWords(response.data.words)
                console.log(response.data)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    } 
    
    useEffect(() => {
        if (checkToken()) {
            getWords()
        } else {
            setIsLoggedIn(false);
            setOpen(true);
        }
    },[isLoggedIn])
    
    return(
        <div>
            {!isLoggedIn && 
            <Dialog
                className='modal-container'
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
            <GetStartedModal setIsLoggedIn={setIsLoggedIn}/>
            </Dialog>
            }
            <Header setIsLoggedIn={setIsLoggedIn} />
            <div className="formBox">
                    <AddWordForm getWords={getWords} />
                    <DeleteWordForm getWords={getWords} />
                    <WordTable words={words} />
            </div>
        </div>
            
    )
}
export default Homepage