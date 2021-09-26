console.log("Clien side javscript file loaded ")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')  // we use # for id and . for class
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from js'

weatherForm.addEventListener('submit',(e)=>{  // e is a event 
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent = 'Loading Search results'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})