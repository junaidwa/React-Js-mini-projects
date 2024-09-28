import { useState,useEffect } from "react";
 export function useLocaLstorageState(initialValue,key){
    const [value, setvalue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      });
      useEffect(function(){
        localStorage.setItem(key,JSON.stringify(value))
       
     },[value])
     return [value,setvalue];
}

 