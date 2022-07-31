import react, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArticleCard } from './ArticleCard';
import { getAllArticles, deleteArticle } from './../modules/ArticlesManager'
import './ArticleList.css'

//This renders all article cards in a list with a button to add additional articles/cards. Coded by Brian.

export const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const getArticles = () => {
        return getAllArticles().then(articlesFromAPI => {
            setArticles(articlesFromAPI)
        })
    }

    useEffect(() => {
        getArticles();
    }, []);


    const handleDeleteArticle = (id) => {
        deleteArticle(id)
        .then(() => getAllArticles().then(setArticles));
    };

    return (
        <>
        <h2 className="page__title">Articles</h2>
        <div className="big__btns">
            <button type="button" className="big__btn btn" id="big__btn" onClick={() => {navigate("/addArticle")}} >Add an article</button>
        </div>
        <div className="article__card">
            {articles.map(article =>
                <ArticleCard
                key={article.id}
                article={article}
                handleDeleteArticle={handleDeleteArticle} 
                />
            )}
        </div>

        </>
    )
}

