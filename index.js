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
    console.log('Calculating BMI on Server');
    const { weight, feet, inches } = request.query;

    // Convert height to inches
    const height = parseInt(feet) * 12 + parseInt(inches);
    console.log('Height:', height, 'inches');
    console.log('Weight:', weight, 'lbs');

    const bmi = (weight / (height * height)) * 703;
    console.log('Your BMI:', bmi);

    response.type('text/plain');
    response.send(bmi.toString());

})

/*API that calculates the Coverage Risk*/
app.get('/calculateRisk', (request, response) => {
    console.log('Calculating Coverage Risk')
    const {age, weight, feet, inches, systolic_bp, diastolic_bp, diabetes, cancer, alzheimers} = request.query
    const diabetesCheck = diabetes == 'true'
    const cancerCheck = cancer == 'true'
    const alzheimersCheck = alzheimers == 'true'
    //Calculate Total Score
    let totalScore = calculateAgeScore(age) + calculateBmiScore(weight,feet,inches) + calculateBloodPressureScore(systolic_bp, diastolic_bp) + calculateFamilyDiseaseScore(diabetesCheck,cancerCheck,alzheimersCheck)
    
    //Assign Total Score to Risk Category
    let riskCategory
    if (totalScore <= 20) {
        riskCategory = "Low Risk"
    } else if (totalScore <= 50) {
        riskCategory = "Moderate Risk"
    } else if (totalScore <= 75) {
        riskCategory = "High Risk"
    } else  {
        riskCategory = "Uninsurable"
    }
    
    response.type('text/plain')
    response.send(riskCategory)

})
function calculateBmiScore(weight,feet,inches) {
    const height = parseInt(feet) * 12 + parseInt(inches);
    const bmi = (weight / (height * height)) * 703;

    //Getting BMI score
    let bmiScore = 0
    if (bmi < 24.9) {
        bmiScore = 0
    } else if (bmi < 29.9) {
        bmiScore = 30
    } else if (bmi < 34.9) {
        bmiScore = 75
    }
    return bmiScore
}

function calculateAgeScore(age) {
    if (age < 30) {
      return 0
    } else if (age < 45) {
        return 10
    } else if (age < 60) {
        return 20
    } else {
        return 30
    }
}

function calculateBloodPressureScore(systolic_bp, diastolic_bp) {
    if (systolic_bp < 120 && diastolic_bp < 80) {
        return 0
    } else if (systolic_bp < 129 && diastolic_bp < 80) {
        return 15
    } else if (systolic_bp < 139 || diastolic_bp < 89) {
        return 30
    } else if (systolic_bp >= 140 || diastolic_bp >= 90) {
        return 75
    } else if (systolic_bp > 180 || diastolic_bp > 120 ) {
        return 100
    }
}

function calculateFamilyDiseaseScore(diabetesCheck,cancerCheck, alzheimersCheck) {
    diseaseScore = 0
    if (diabetesCheck) {
        diseaseScore += 10
    }
    if (cancerCheck) {
        diseaseScore += 10
    }
    if (alzheimersCheck) {
        diseaseScore += 10
    }
    return diseaseScore
}

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