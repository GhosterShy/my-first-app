'use client';


import React from "react";
import Link from "next/link";






export default function DrinkCard(props:any) {
  
  return (
    <div className="col">
      <div  className="card-bah  h-100 bahandi-card">
        <div className="bahandi-card-img-placeholder">
         
          <div className="img_div">
            <img className="img" src={props.imageUrl} alt={props.name} />
          </div>
        
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.price} ₸</h5>
          <Link style={{textDecoration:"none"}}  href={`/posts/${props.id}`}>
          <p className="card-text">{props.name}</p>
          </Link>
          <button onClick={props.onAddToCart} className="btn_cart  bahandi-add-to-cart-btn w-100">В корзину</button>
        </div>
      </div>
    </div>
  );
}