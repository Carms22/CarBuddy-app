import React from "react";
import '../../styles/partials/components/Rating.scss'

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
      <h6  className='Rating'> {numberStarts()}</h6>
    </div>
  )
}

export default Rating;