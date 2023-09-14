const express = require('express');
const {createClient} = require("@supabase/supabase-js");
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
let url = 'https://oxovhbhwuxpyiqkxizbe.supabase.co';
let pass = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94b3ZoYmh3dXhweWlxa3hpemJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Njg2MzAsImV4cCI6MjAwNjQ0NDYzMH0.YdbrQlYhlfQrJhC2_99ZGFaL0hrg26sMRbVGXAUejX4';

let supabase = createClient(url,pass);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())

//get css file
app.get('/home.css',(req,res)=>{res.sendFile(__dirname+'/views/css/home.css')})
app.get('/t.css',(req,res)=>{res.sendFile(__dirname+'/views/css/table.css')})
app.get('/pr.css',(req,res)=>{res.sendFile(__dirname+'/views/css/pro.css')})
app.get('/e.css',(req,res)=>{res.sendFile(__dirname+'/views/css/edit.css')})
app.get('/font',(req,res)=>{res.sendFile(__dirname+'/pa.ttf')})
app.get('/logo',(req,res)=>{res.sendFile(__dirname+'/img/logo.jpeg')})
app.get('/imgall',(req,res)=>{res.sendFile(__dirname+'/img/all.jpeg')})
app.get('/imgteacher',(req,res)=>{res.sendFile(__dirname+'/img/teacher.jpeg')})
app.get('/imgged',(req,res)=>{res.sendFile(__dirname+'/img/ged.jpeg')})
app.get('/imgpreged',(req,res)=>{res.sendFile(__dirname+'/img/preged.jpeg')})
app.get('/imgsecondary',(req,res)=>{res.sendFile(__dirname+'/img/secondary.jpeg')})

//get home page
app.get('/',(req,res)=>{
    res.render('home')
})

//get all students page
app.get('/students/:year',async(req,res)=>{
    if(req.params.year == 2023){
        let {data,error} = await supabase.from('2023').select().eq('type','student');
        res.render('s',{all:data,page:'Students',year:2023})
    }else{
        res.send("No page found!")
    }
})

//get teachers page
app.get('/teachers/:year',async(req,res)=>{
    if(req.params.year == 2023){
        let {data,error} = await supabase.from('2023').select().eq('type','teacher');
        res.render('s',{all:data,page:'Teachers',year:2023})
    }
})

//get pre GED page
app.get('/pre-ged/:year',async(req,res)=>{
    if(req.params.year == 2023){
        let {data,error} = await supabase.from('2023').select().eq('class','pre ged');
        res.render('s',{all:data,page:'pre ged',year:2023})
    }
})

//get GED page
app.get('/ged/:year',async(req,res)=>{
    if(req.params.year == 2023){
        let {data,error} = await supabase.from('2023').select().eq('class','ged');
        res.render('s',{all:data,page:'ged',year:2023})
    }
})

//get Secondary page
app.get('/secondary/:year',async(req,res)=>{
    if(req.params.year == 2023){
        let {data,error} = await supabase.from('2023').select().eq('class','secondary');
        res.render('s',{all:data,page:'secondary',year:2023})
    }
})

//get profile page
app.get('/p/:id',async(req,res)=>{
    let id = req.params.id;
    let {data,error} = await supabase.from('2023').select().eq('member_id',id);
    res.render('p',{all:data,year:2023})
})

//get editor page
app.get('/edit/:class/:subject/:year', async(req,res)=>{
    let clas = req.params.class;
    let year = req.params.year;
    let subject = req.params.subject;
    //console.log(clas+','+year+','+subject);
    let {data,error} = await supabase.from(year).select().eq('class',clas);
    if(data){
        res.render('e',{
            all:data,
            year:year,
            clas:clas,
            subject:subject
        })
    }
})

//listen login page
app.get('/login',(req,res)=>{
    res.render('login',{
        email:'',
        pass:'',
        msg:''
    })
})

//listen teacher login
app.post('/login',async(req,res)=>{
    let subject = req.query.subject;
    let to = req.query.back
    let db = [
        {"email":"tai@o2k.mail","pass":"taio2knk","subject":"tai"},
        {"email":"myanmar@o2k.mail","pass":"premyano2k","subject":"burmese"},
        {"email":"english@o2k.mail","pass":"b1englisho2k","subject":"english"},
        {"email":"math@o2k.mail","pass":"gedmathso2k","subject":"mathematic"},
        {"email":"science@o2k.mail","pass":"gedscio2k","subject":"science"},
        {"email":"art@o2k.mail","pass":"arto2k","subject":"art"},
        {"email":"thai@o2k.mail","pass":"thaio2knk","subject":"thai"},
        {"email":"chinese@o2k.mail","pass":"chno2knk","subject":"chinese"},
        {"email":"ictbasic@o2k.mail","pass":"icto2knk","subject":"ict_basic"},
        {"email":"program@o2k.mail","pass":"programming","subject":"ict_program"},
    ];
    const {email,pass} = req.body;
    let data = db.find((i)=> i.email === email && i.pass === pass);
    if(data){
        res.render('success',{
            subject:subject,
            to: to
        })
    }else{
        res.render('login',{
            email:email,
            pass:pass,
            msg:'Check your email or password!'
        })
    }
    //console.log(email+','+pass)
})

//listen all students page
app.get('/students',(req,res)=>{
    res.render('allstudent')
})

//listen update student points
app.post('/update/:year/:subject/:id',async(req,res)=>{
    let sid = req.params.id;
    let year = req.params.year;
    let subject = req.params.subject;
    let {point} = req.body;
    let back = req.query.back;
    let toback = back.split('/ed')[1]
    console.log(sid+','+point+','+back+','+toback+','+year);
    if(subject == 'tai'){
        const {data,error} = await supabase.from(`${year}`).update({'tai' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'burmese'){
        const {data,error} = await supabase.from(`${year}`).update({'burmese' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'english'){
        const {data,error} = await supabase.from(`${year}`).update({'english' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'mathematic'){
        const {data,error} = await supabase.from(`${year}`).update({'mathematic' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'science'){
        const {data,error} = await supabase.from(`${year}`).update({'science' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'thai'){
        const {data,error} = await supabase.from(`${year}`).update({'thai' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'chinese'){
        const {data,error} = await supabase.from(`${year}`).update({'chinese' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'art'){
        const {data,error} = await supabase.from(`${year}`).update({'art' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'ict_basic'){
        const {data,error} = await supabase.from(`${year}`).update({'ict_basic' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }else if(subject == 'ict_program'){
        const {data,error} = await supabase.from(`${year}`).update({'ict_program' : point}).eq('member_id',`${sid}`);
        res.redirect('/ed'+toback);
    }
})

//get qr code scanner page
app.get('/scanner',(req,res)=>{
    res.sendFile(__dirname+'/scan.html')
})

//listen search query
app.post('/search',async(req,res)=>{
    let {id} = req.body;
    const {data,error} = await supabase.from('2023').select().ilike('member_id',`%${id.toLowerCase()}%`);
    if(error){
        res.send(error);
    }else{
        if(data.length !== 0){
            res.render('find',{
                all:data,
                value:id
            })
            console.log(data)
        }else{
            res.render('find',{
                data:'not found',
                value:id
            })
        }
    }
    
    
})


//test
app.get('/up',(req,res)=>{
    res.sendFile(__dirname+'/up.html')
})

app.post('/up/send',async(req,res)=>{
    const {img} = req.body;
    const {data,error} = await supabase.from('img').
    insert([{path:img}])
    if(data){
        res.send('uploaded')
    }
})

app.listen(80,()=>{console.log("server started with port 80")})