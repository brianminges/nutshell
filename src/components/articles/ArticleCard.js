import react from "react";
import { Link } from "react-router-dom";
import './ArticleCard.css'
import './../Nutshell.css'
import { useNavigate } from "react-router-dom";

//This renders each article in a card. Coded by Brian.

export const ArticleCard = ({ article, handleDeleteArticle, handleEditArticle }) => {

    const navigate = useNavigate();

    return (
        <>
        <div className="article__cards">
            <div className="article__card">
                <Link to={article.url}>
                <h4 className="article__title" target="_blank"> {article.title}</h4>
                </Link>
                    <p><em>Posted by {article.user.name} on {article.timestamp}</em></p>
                    <p><strong>Synopsis</strong> {article.synopsis}</p>
                    {/* <Link to={article.url}>
                        <strong> Go to full article</strong>
                    </Link></p> */}
                <div className="crud__btns">
                    <button type="button" className="crud__btn btn" id="delete__btn" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                    <button type="button" className="crud__btn btn" id="edit__btn"onClick={() => {navigate(`/${article.id}/edit`)}} >Edit</button> 

                    {/* <Link className="crud__btn btn" to={`/${article.id}/edit`}> 
                        <button className="btn">Edit</button>
                    </Link> */}
            
                </div>
            <hr></hr>
            </div>
        </div>
        </>
    )
}


 