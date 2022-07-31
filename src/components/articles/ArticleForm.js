import react, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addArticle } from './../modules/ArticlesManager'
import './ArticleForm.css'
import './../Nutshell.css'

//This is the form users use to add new articles. Coded by Brian. 

export const AddArticleForm = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("nutshell_user"))
    const sessionUserId = sessionUser.id
    const [article, setArticle] = useState({
        
        title: "",
        synopsis: "",
        timestamp: new Date().toLocaleString(),
        url: "",
        userId: sessionUserId
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const newArticle = {...article}
        let selectedVal = event.target.value
        newArticle[event.target.id] = selectedVal
        setArticle(newArticle)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (article.url === "" || article.title === "" || article.synopsis === "") {
            window.alert('All fields must be filled in')
        } else {
            addArticle(article)
                .then(() => navigate("/articles"))
        }
    }

    return (
        <form>
            <div  className="form__inputs">
                <h2 className="page__title">Add an article</h2>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="title" className="form__input__label" >Headline</label>
                        <input type="text" className="form__input__field" id="title" onChange={handleInputChange} required value={article.title} /> 
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="synopsis" className="form__input__label" >Synopsis</label>
                        <input type="text" className="form__input__field" id="synopsis" onChange={handleInputChange} required value={article.synopsis} /> 
                        
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="url" className="form__input__label">URL</label>
                        <input type="url" className="form__input__field" id="url" onChange={handleInputChange} required value={article.url} /> 
                    </div>
                </fieldset>
                <div className="form__input crud__btn">
                    <button className="submit__btn"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                
            </div>
        </form>
    )
}