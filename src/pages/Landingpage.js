import '../css/Landingpage.css';
import Book from '../images/book.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import GetStartedModal from '../components/GetStartedModal';
import { Dialog } from '@material-ui/core';

const LandingPage = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `home`;
        navigate(path);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='content-container'>
            <div className='title-container'>
                <div className='title-header'>Grow Your Vocabulary</div>
                <div className='subtitle-header'>Create your own database of word <br />
                    definitions and synonyms.
                </div>
                <div className='button-header'>
                    <button className='title-button' type="button" onClick={handleOpen}>Get Started</button>
                </div>
                <div>
                    <Dialog
                        className='modal-container'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <GetStartedModal />
                    </Dialog>
                </div>
            </div>
            <div className='image-container'>
                <img className='book-css' src={Book} alt='a book' />
            </div>
        </div>
    )
}
export default LandingPage