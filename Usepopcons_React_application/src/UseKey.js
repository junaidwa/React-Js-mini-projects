//In this componet we add two functionality one is enter keydown and other is escap
import {useEffect } from "react";
export function UseKey(key,action){
    useEffect(function(){
        function CallBack(e){
          if(e.code.toLowerCase() ===key.toLowerCase()){
            action();
            // console.log("Closing");
          }
        }
        document.addEventListener("keydown",CallBack)
      return function (){
    document.removeEventListener("keydown",CallBack)  }
        
    
    
      },[action,key])
}