const express = require('express')
app = express()
const http = require('http')
const cors = require("cors")
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }))

/*Home page for the server*/
app.get('', (request, response) =>{
    consolse.log('Opening home page')
    response.type('text/plain')
    response.send('This is a server for ChairForceOnes Health Insurance Risk Calculator')
})

/*API that calculates the BMI*/
app.get('/calculateBMI', (request, response) =>{
    consolse.log('Calculating BMI on Server')

})

/*API that calculates the Coverage Risk*/
app.get('/calculateRisk', (request, respose) => {
    consolse.log('Calculating Coverage Risk')
    
})

app.use((request, response) => {
    response.type('text/plain')
    response.status(404)
    response.send('404 - Not Found')
  })
  
app.use((err, request, response, next) => {
    console.error(err.message)
    response.type('text/plain')
    response.status(500)
    response.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
  )