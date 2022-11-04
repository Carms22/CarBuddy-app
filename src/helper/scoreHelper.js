export const calculateUserScore = (scores) => {
  return scores.reduce( (acc, curr) => acc += curr.points, 0) / scores.length 
}