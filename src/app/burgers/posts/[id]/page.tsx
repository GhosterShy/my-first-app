'use client';
import { useParams } from "next/navigation";
import { useEffect, useState,FormEvent } from 'react';
import React from "react";
import axios from "axios";
import Link from "next/link";
import CommentsPage from "./commentPage";
import "./style.css"

function DetailPage() { 
    const { id } = useParams();
    const [product, setProduct] = useState<Drink>(); 
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    const [commentText, setCommentText] = useState<string>('');
    const [submitMessage, setSubmitMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://2a8fac2d5c839200.mokky.dev/burgers/${id}`);
                const commentsResponse = await axios.get(`https://2a8fac2d5c839200.mokky.dev/comments?postId=${id}`);
                setProduct(response.data);
                setComments(commentsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        
        
        fetchData();
        
    }, [id]); 


    const SubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setSubmitMessage('Комментарий не может быть пустым!');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Отправка комментария...');

    try {
      const commentUrl = 'https://2a8fac2d5c839200.mokky.dev/comments';
      const commentData = {
        postId: id,
        text: commentText,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(commentUrl, commentData);

      if (response.status === 200 || response.status === 201) {
        setSubmitMessage('Комментарий успешно отправлен!');
        setCommentText('');
      } else {
        setSubmitMessage('Ошибка при отправке комментария.');
      }
    } catch (error) {
      console.error(error);
      setSubmitMessage('Ошибка при отправке комментария.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 4000);
    }
  };





    if (loading) {
        return (
             <div className="loading-container">
          <div className="dot-spinner">
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container">
                <h1>Продукт не найден</h1>
                <Link href="/">Вернуться на главную</Link> 
            </div>
        );
    }

    return (
        <main className="product-container">
            <div className="product-info">
            <section className="product-image">
                <img src={product.imageUrl} alt="Изображение продукта" /> 
            </section>
            <section className="product-details">
                <h2 className="product-title">{product.name}</h2> 
            
                <p className="product-price">Цена: {product.price} $</p> 
                <div className="product-description">
                    <h3>Описание:</h3>
                    <p>{product.description}</p> 
                </div>
                <button className="add-to-cart-button">Добавить в корзину</button>
            </section>
            </div>


           <form onSubmit={SubmitComment} className="comment-section">
        <label htmlFor="comment" className="form-label">Оставить комментарий:</label>
        <textarea
          id="comment"
          placeholder="Напишите комментарий..."
          className="form-control"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isSubmitting}></textarea>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
             {submitMessage && <p className="message-text">{submitMessage}</p>}


        <div className="comments-section">
            <h3 className="comment_text">Комментарии:</h3>
            {comments.length === 0 ? (
                <p className="com_P">Нет комментариев.</p>) : (
                    comments.map((comment) => (
                    <CommentsPage  key={comment.id} id = {comment.id} createdAt ={comment.createdAt} text={comment.text}/>
                ))
            )}
                       

        </div>
        </main>
        
    );
}

export default DetailPage; 