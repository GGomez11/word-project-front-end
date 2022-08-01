import '../css/Landingpage.css'
import Book from '../images/book.png'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `home`; 
    navigate(path);
  }

    return (
        <div className='content-container'>
            <div className='title-container'>
                <div className='title-header'>Grow Your Vocabulary</div>
                <div className='subtitle-header'>Create your own database of word <br/>
                    definitions and synonyms. 
                </div>
                <div className='button-header'>
                    <button className='title-button' type="button" onClick={routeChange}>Get Started</button>
                </div>
            </div>
            <div className='image-container'>
                <img className='book-css' src={Book} alt='a book'/>
            </div>
        </div>
    )
}
export default LandingPage