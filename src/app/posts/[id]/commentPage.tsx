'use client';
import React from "react";


function CommentsPage(props:any) {
    return (
        
           <div className="card card_comment mb-3">
            <div className="card-body">
                <h6 className="card-title">Дата:{new Date(props.createdAt).toLocaleDateString()}</h6>
                <p className="card-text">{props.text}</p>
            </div>
            </div>
       
    );
}

export default CommentsPage;