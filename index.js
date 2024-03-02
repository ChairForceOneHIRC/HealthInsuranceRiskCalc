const express = require('express')
const url = require('url')
app = express()
const http = require('http')
const cors = require("cors")
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }))

/*Home page for the server*/
app.get('', (request, response) =>{
    console.log('Opening home page')
    response.type('text/plain')
    response.send('This is a server for ChairForceOnes Health Insurance Risk Calculator')
})

/*API that calculates the BMI*/
app.get('/calculateBMI', (request, response) =>{
    console.log('Calculating BMI on Server')
    var inputs = url.parse(request.url, true).query
	//const heightFeet = parseInt(inputs.feet) //i don't think this is needed bc the client side has you only putting in height in inches
	const height = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	//console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
    console.log('Height' + height + 'inches')
	console.log('Weight:' + weight + ' lbs.')

  
    const bmi=(weight/(height**2))*703
    console.log("your bmi: ", bmi)

    var result = 'Your BMI is: ' + bmi
	response.type('text/plain')
	response.send(result)

})

/*API that calculates the Coverage Risk*/
app.get('/calculateRisk', (request, respose) => {
    console.log('Calculating Coverage Risk')
    
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