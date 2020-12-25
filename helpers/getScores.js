import axios from 'axios'


export function getTotalScore(data, totalLessons) {
    let totalScore = 0

    data.forEach((datum) => {
        totalScore += datum.totalScore
    })

    const total = (Math.round(((totalScore * 10) / totalLessons.length) * 10)) / 10

    return total
}

export function render (id) {
    axios({
        method: 'GET', 
        url: 'http://10.0.2.2:3000/scores/' + id
    })
    .then(({ data }) => {
        return data
    })
    .catch( err => {
        console.log(err)
    })
}

module.exports = {
    getTotalScore,
    render
}