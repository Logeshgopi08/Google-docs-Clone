/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { TOOLBAR_OPTIONS } from '../utlis/constant';
import "./TextEditor.css";
import io from "socket.io-client";
import {useParams} from "react-router-dom";

const TextEditor = () => {

  const [socket,setSocket] = useState();
  const [quill,setQuill ] =  useState();
  const params = useParams();


  useEffect(()=>{
    
    const s= io("http://localhost:5000");
    setSocket(s);

    return ()=>{
      s.disconnect();
    }
  },[]);

  useEffect(()=>{
    if(socket == null || quill == null) return;
      
     const handler = (delta,oldDelta,source)=>{
      
      if(source !== "user") return;
 
      socket.emit("send-changes",delta);
    }
    
    quill.on("text-change",handler);

    return ()=>{
      quill.off("text-change",handler);
    }
  },[socket,quill]);


  useEffect(()=>{
    if(socket ==null || quill == null) return;
    const handler = (delta) =>{
      quill.updateContents(delta);
    }
    socket.on("receive-changes",handler);

    return ()=>{
      socket.off("receive-changes",handler);
    }
  },[socket,quill]);

useEffect(()=>{
  if(socket == null || quill == null) return;
  socket.once("load-documents",(document)=>{
    quill.setContents(document);
    
  })

  socket.emit("get-document",params.id);
},[
  socket,quill,params.id
]);


useEffect(()=>{
  if(socket == null || quill == null) return;
  const interval = setInterval(()=>{
  socket.emit("save-changes",quill.getContents());

  },2000);

  return ()=>{
    clearInterval(interval);
  }
},[socket,quill]);
 
 



    const wrapperRef = useCallback((wrapper)=>{
        if(wrapper == null) return;
        wrapper.innerHtml = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, {
            theme: "snow",
            modules: {
              toolbar: TOOLBAR_OPTIONS,
            },
          });
          setQuill(q);
    },[]);

  
  


  return (
    <div className='container' ref={wrapperRef}>
      
    </div>
  )
}

export default TextEditor;
