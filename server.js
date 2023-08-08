const express = require('express');
const {createClient} = require("@supabase/supabase-js");
const ejs = require('ejs');
const app = express();
let url = 'https://oxovhbhwuxpyiqkxizbe.supabase.co';
let pass = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94b3ZoYmh3dXhweWlxa3hpemJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Njg2MzAsImV4cCI6MjAwNjQ0NDYzMH0.YdbrQlYhlfQrJhC2_99ZGFaL0hrg26sMRbVGXAUejX4';

let supabase = createClient(url,pass);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

//get css file
app.get('/home.css',(req,res)=>{res.sendFile(__dirname+'/views/css/home.css')})
app.get('/t.css',(req,res)=>{res.sendFile(__dirname+'/views/css/table.css')})
app.get('/pr.css',(req,res)=>{res.sendFile(__dirname+'/views/css/pro.css')})

//get home page
app.get('/',(req,res)=>{
    res.render('home')
})

//get all students page
app.get('/students',async(req,res)=>{
    let {data,error} = await supabase.from('members').select().eq('type','student');
    res.render('s',{all:data,page:'Students'})
})

//get teachers page
app.get('/teachers',async(req,res)=>{
    let {data,error} = await supabase.from('members').select().eq('type','teacher');
    res.render('s',{all:data,page:'Teachers'})
})

//get pre GED page
app.get('/pre-ged',async(req,res)=>{
    let {data,error} = await supabase.from('members').select().eq('class','pre ged');
    res.render('s',{all:data,page:'pre ged'})
})

//get GED page
app.get('/ged',async(req,res)=>{
    let {data,error} = await supabase.from('members').select().eq('class','ged');
    res.render('s',{all:data,page:'ged'})
})

//get ICT page
app.get('/ict',async(req,res)=>{
    let {data,error} = await supabase.from('members').select().eq('class','ict');
    res.render('s',{all:data,page:'ict'})
})

app.get('/d',(req,res)=>{
    let datab = onValue(ref(db, '/users/'), (snapshot) => {
        const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
      }, {
        onlyOnce: true
      });
})

//get profile page
app.get('/p/:id',async(req,res)=>{
    let id = req.params.id;
    let {data,error} = await supabase.from('members').select().eq('member_id',id);
    res.render('p',{all:data})
})

app.listen(80,()=>{console.log("server started with port 80")})