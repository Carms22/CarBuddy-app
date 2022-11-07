import React from "react";

const Rating = (props) => {
  const starts = Math.ceil(props.children);
  
  const numberStarts = () =>{
    switch (starts) {
      case 0:
        return 'Rating: ☆☆☆☆☆'
      case 1:
        return 'Rating: ★☆☆☆☆'
      case 2:
        return 'Rating: ★★☆☆☆'
      case 3:
        return 'Rating: ★★★☆☆'
      case 4:
        return 'Rating: ★★★★☆'
      case 5:
        return 'Rating: ★★★★★'
      default:
        return "No rating"
      }
  }
  return (
    <div>
      <h6> {numberStarts()}</h6>
    </div>
  )
}

export default Rating;