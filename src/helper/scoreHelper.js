export const calculateUserScore = (scores) => {  
  const scoresWithPoints = scores.filter(score => score.points || score.points === 0);

  return (scoresWithPoints.reduce((acc, curr) => acc += curr.points, 0) / scoresWithPoints.length)
}
