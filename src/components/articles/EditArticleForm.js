import react, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllArticles, editArticle, getArticleById } from './../modules/ArticlesManager'
import './ArticleForm.css'
import './../Nutshell.css'

//This is the form users use to edit previously saved articles. Coded by Brian. 

export const EditArticleForm = () => {
    const [article, setArticle] = useState({
        title: "",
        synopsis: "",
        url: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const {articleId} = useParams();
    const navigate = useNavigate();

    const handleFieldChange = (event) => {
        const stateToChange = {...article };
        stateToChange[event.target.id] = event.target.value;
        setArticle(stateToChange)
    }

    const updateArticle = (event) => {
        event.preventDefault()
        setIsLoading(true);

        const editedArticle = {
            id: articleId,
            title: article.title,
            synopsis: article.synopsis,
            url: article.url
        };
    editArticle(editedArticle)
        .then(() => navigate("/articles")
        )
    }

    useEffect(() => {
        getAllArticles()
            .then(setArticle)
    }, []);

    useEffect(() => {
        getArticleById(articleId)
            .then(article => {
                setArticle(article);
                setIsLoading(false);
            });
    }, [articleId]);


    return (
        <>
        <form>
            <div  className="form__inputs">
                <h2 className="page__title">Edit an article</h2>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="title" className="form__input__label" >Headline</label>
                        <input type="text" className="form__input__field" id="title" onChange={handleFieldChange} required value={article.title} /> 
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="synopsis" className="form__input__label" >Synopsis</label>
                        <input type="text" className="form__input__field" id="synopsis" onChange={handleFieldChange} required value={article.synopsis} /> 
                        
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="url" className="form__input__label">URL</label>
                        <input type="url" className="form__input__field" id="url" onChange={handleFieldChange} required value={article.url} /> 
                    </div>
                </fieldset>
                <div className="form__input crud__btn">
                    <button className="submit__btn"
                        onClick={updateArticle}>
                        Submit
                    </button>
                </div>
                
            </div>
        </form>
        </>
    );
}



