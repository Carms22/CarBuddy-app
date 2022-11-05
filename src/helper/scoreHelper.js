export const calculateUserScore = (scores) => { 
  console.log(scores);

  const scoresWithPoints = scores.filter(score => score.points || score.points === 0);

  return (scoresWithPoints.reduce((acc, curr) => acc += curr.points, 0) / scoresWithPoints.length).toLocaleString(
    'en-IN',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )
}
