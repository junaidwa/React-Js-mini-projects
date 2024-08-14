import { useState } from "react";

const wholecontainer = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
    width: "30px",
  height: "30px",
  paddingTop:'20px'

};
const Subcontainer = {
  display: "flex",
  gap: "10px",
  
};

export default function StarRating({ maxrating,color='yellow',size=48 ,message=[],Onsetexternalratting}) {
  const [rating, setrating] = useState(0);
  const [hoverrating,sethoverrating]= useState(0)
  function handlerate(rating) {
    setrating(rating);
    Onsetexternalratting(rating)
  }
  const numberstyle ={
    color:`${color}`,
    fontSize:`${size}px`
  }

  return (
    <div style={wholecontainer}>
      <div style={Subcontainer}>
        {Array.from({ length: maxrating }, (_, i) => (
          // <span>S{i+1}</span>

          <FullStar
            key={i}
            onrate={() => handlerate(i + 1)}
            hoverin ={()=>sethoverrating(i+1)}
            hoverout ={()=>sethoverrating(0)}
            color={color}
            size={size}
            full={hoverrating ? hoverrating >= i+1 : rating >= i + 1}
          />
        ))}
      </div>
      <p style={numberstyle} >{message.length === maxrating ?  message [hoverrating ? hoverrating-1 :  rating-1] : hoverrating || rating || "" }</p>
    </div>
  );
}

function FullStar({ onrate, full,hoverin,hoverout ,color , size}) {
    const Starcontainer = {
      display: "block",
      width: `${size}px`,
      height: `${size}px`,
   
    };
  return (
    <span role="button" style={Starcontainer} onClick={onrate} onMouseEnter={hoverin} onMouseLeave={hoverout}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          //{" "}
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

// FULL STAR

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 20 20"
//   fill="#000"
//   stroke="#000"
// >
//   <path
//     d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//   />
// </svg>

// EMPTY STAR

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 24 24"
//   stroke="#000"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="{2}"
//     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//   />
// </svg>

// */
