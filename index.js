const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})) 

let class_details;
let noisemakers_list = []

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/noisemakers', (req,res)=>{
    // console.log(noisemakers_list);
    res.render('noisemakers', {noisemakers_list, class_details})
})

app.post('/register',(req,res)=>{
    class_details = req.body
    noisemakers_list = []
    res.redirect('/noisemakers')
})

app.post('/noisemaker_name', (req, res) =>{
    req.body.times = 1
    noisemakers_list.push(req.body)
    res.redirect('/noisemakers')
})

app.get('/reset',(req,res)=>{
    noisemakers_list = []
    res.redirect('/noisemakers')
})

app.get('/increment/:student_name',(req,res)=>{
    let studentName = req.params.student_name
    let find_student = noisemakers_list.find((student)=>{
        return student.student_name === studentName
    })

    find_student.times = Number(find_student.times) + 1
    res.redirect('/noisemakers')

})

app.get('/decrement/:student_name',(req,res)=>{
    let studentName = req.params.student_name
    let find_student = noisemakers_list.find((student)=>{
        return student.student_name === studentName
    })

    find_student.times = Number(find_student.times) - 1
    if (find_student.times === 0){
        noisemakers_list.splice(noisemakers_list.indexOf(find_student), 1)
    }
    res.redirect('/noisemakers')

})



app.listen(port, (err) =>{
    if(err) {
        console.log(err)
    }else{
        console.log(`Server is running on port ${port}`)
    }
})