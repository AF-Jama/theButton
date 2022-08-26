// client side

const resetButton = document.querySelector('.btn-primary')
const clicksContainer = document.getElementById('counter-container')

function getFutureTime(delay) {  
    const date = new Date();

    // date.setSeconds(date.getSeconds()+60,0)

    return date.getSeconds() + delay;
}

function getTimeNow(){
    let date = new Date()

    return date.getSeconds();
}


/*% (1000 * 60)/ 1000)*/

let secondsNow = getTimeNow();
let secondsInFuture = getFutureTime(60);

let counter = secondsInFuture - secondsNow; 

var numberElement = document.querySelector('#timer p')

function incrementDown(){
    // method decrements counter down and hence apply changes to dom element
    var numberElement = document.querySelector('#timer p')
    
    if(counter>=0){
        numberElement.innerHTML = `${counter}`
        counter--;
        return;
    }
    numberElement.innerHTML = `SUCCESFULL`

}

resetButton.addEventListener('click', async e=>{
    e.preventDefault()

    console.log("SUCCESFULLL")
    const a  =document.querySelector('#timer p').innerHTML
    const body = {
        time:numberElement.innerHTML
    }
    console.log(body)
    await fetch('/press',{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
            
        }
    })


})

async function getSecondsFromServer(){
    let seconds = await fetch('/timer',{
        method:"POST"
    })
    seconds = await seconds.json()

    numberElement.innerHTML = `${seconds['data']}`
    
}

async function getTotalNumberOfClicks(){
    let clicks = await fetch('/getClicks')
    clicks = await clicks.json()

    clicksContainer.innerHTML = `${clicks.number} times clicked`
}

var timer = setInterval(getSecondsFromServer,1000)
var clicks = setInterval(getTotalNumberOfClicks,1000)
