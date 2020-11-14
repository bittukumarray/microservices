import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({comments}) => {
  

  const renderedComments = comments.map((comment) => {
    let content;
    if(comment.status==="approved"){
      content=comment.content;
    }
    if(comment.status==="rejected"){
      content="This comment has been rejected";
    }
    if(comment.status==="pending"){
      content="this comment is awaiting moderation";
    }
    return (
      <div
        className="card"
        style={{ width: "100%", marginBottom: "20px" }}
        key={comment.id}
      >
        <div className="card-body">
          <h3>{content}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedComments}
    </div>
  );
};
