function getScores(){
    return {
        'home-score':parseInt(document.getElementById('home-score').innerText), 
        'guest-score':parseInt(document.getElementById('guest-score').innerText)
    }
}

function updateScores(scoreType, score){
    document.getElementById(scoreType).innerText = score + getScores()[scoreType]
}

function displayWinner(winner){
    winner = winner.split("-")[0].toUpperCase()
    document.getElementsByClassName("container")[0].style.visibility = 'hidden'
    const para = document.createElement("p")
    para.innerHTML = `<p> ${winner} </p>`
    const title = document.createElement("h1")
    title.innerHTML = `<h1> Winner:</h1>`
    title.style.fontFamily = 'Verdana'
    const body = document.getElementsByTagName("body")[0]
    body.classList.add("restrict")
    const outerContainer = document.getElementsByClassName("outer-container")[0]
    outerContainer.classList.add("wave")
    body.insertBefore(para, outerContainer)
    body.insertBefore(title, para)
    para.classList.add("show-winner")
}

function displayLead(){
    const homeScore = getScores()['home-score']
    const guestScore = getScores()['guest-score']
    const indicator = document.querySelectorAll('.empty')
    if(homeScore > guestScore){
        indicator[0].classList.add("dot")
        indicator[0].classList.remove("draw")
        indicator[1].classList.remove("dot")

        if(homeScore >= 20 && guestScore<20) displayWinner('home-score')
    }
    else if(homeScore < guestScore){
        indicator[1].classList.add("dot")
        indicator[1].classList.remove("draw")
        indicator[0].classList.remove("dot")

        if(guestScore >= 20 && homeScore < 20) displayWinner('guest-score')
    }
    else{
        indicator.forEach((ind) =>{
            ind.classList.add("dot", "draw")
        })
    }


}


function handleClicks(score, scoreType){
    updateScores(scoreType, parseInt(score.substring(1)))
    displayLead()
}



const homeScoreAdders = document.querySelector('.home .score').getElementsByTagName('p')
const guestScoreAdders = document.querySelector('.guest .score').getElementsByTagName('p')
const scoreAddersLength = homeScoreAdders.length

for(let i=0;i<scoreAddersLength;i++){
    let homeScore = homeScoreAdders[i].innerText
    let guestScore = guestScoreAdders[i].innerText
    homeScoreAdders[i].addEventListener('click', ()=>{handleClicks(homeScore, 'home-score')})
    guestScoreAdders[i].addEventListener('click', ()=>{handleClicks(guestScore, 'guest-score')})
}

displayLead()