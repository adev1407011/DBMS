var exp=require('express')
var { Pool }=require('pg')
var bp=require('body-parser')


var app=exp()

var pool=new Pool(
    {user:"postgres",
    host:"localhost",
    database:"Emp",
    password:"1407011",
    port:5432 }
)
app.use(bp.urlencoded({extended:false}))
app.get('/home',function(req,res){ res.sendFile(__dirname+'/home.html')})
app.get('/login_th',function(req,res){ res.sendFile(__dirname+'/login_th.html')})
app.get('/login_dh',function(req,res){ res.sendFile(__dirname+'/login_dh.html')})
app.get('/admin',function(req,res){ res.sendFile(__dirname+'/admin_login.html')})
app.get('/add_emp',function(req,res){ res.sendFile(__dirname+'/add_emp.html')})
app.get('/add_dept',function(req,res){ res.sendFile(__dirname+'/add_dept.html')})
app.get('/add_team',function(req,res){ res.sendFile(__dirname+'/add_team.html')})
app.get('/upd_emp',function(req,res){ res.sendFile(__dirname+'/upd_emp.html')})
app.get('/upd_dept',function(req,res){ res.sendFile(__dirname+'/upd_dept.html')})
app.get('/upd_team',function(req,res){ res.sendFile(__dirname+'/upd_team.html')})
app.get('/all_dept',function(req,res){ res.sendFile(__dirname+'/view_all_dept.html')})
app.get('/all_team',function(req,res){ res.sendFile(__dirname+'/view_all_team.html')})
app.get('/all_emp',function(req,res){ res.sendFile(__dirname+'/view_all_emp.html')})
app.get('/search_emp',function(req,res){ res.sendFile(__dirname+'/search_emp.html')})
app.get('/count_emp',function(req,res){ res.sendFile(__dirname+'/count_emp.html')})
app.get('/del_emp',function(req,res){ res.sendFile(__dirname+'/del_emp.html')})
app.get('/del_dept',function(req,res){ res.sendFile(__dirname+'/del_dept.html')})
app.get('/del_team',function(req,res){ res.sendFile(__dirname+'/del_team.html')})
app.get('/sign_up',function(req,res){ res.sendFile(__dirname+'/sign_up.html')})


app.post('/emp_login',async(req,res)=>{
    let {mail, pwd }=req.body;
    list=await pool.query('select pwd from login where mail = $1',[mail]);
    list=list.rows;
    if(list.length==0){ res.send('Username Not found'); }
    //console.log(list.pwd);
    else{
        if(pwd==list[0].pwd){ res.send('correct'); }
        else{ res.send('<h1><mark>Password wrong</mark> - Retry</h1>'); }
    }
    
});

app.post('/admin_login',async(req,res)=>{
    let {mail, pwd }=req.body;
    list=await pool.query('select pwd from login where mail = $1',[mail]);
    list=list.rows;
    if(list.length==0){ res.send('Username Not found'); }
    //console.log(list.pwd);
    else{
        if(pwd==list[0].pwd){ res.sendFile(__dirname+'/admin_home.html'); }
        else{ res.send('<h1><mark>Password wrong</mark> - Retry</h1>'); }
    }
    
});

app.post('/emp_add', async(req,res)=>{
    let { e_id, e_name, ph_no, d_no, st, city, p_code, mail, sal, dt_join, d_id, t_id }=req.body;
    try{
    await pool.query('insert into Employee values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[e_id, e_name, ph_no, d_no, st, city, p_code, mail, sal, dt_join, d_id, t_id]);
    res.send("<h1 color:'pink'> Successfully Employee details Added</h1>")
    }
    catch(err){
        console.log('Error in emp_add -'+err);
        res.send('Error in emp_add - '+err);
    }
})

app.post('/dept_add',async(req,res)=>{
    let { d_id, d_name }=req.body;
    try{
        await pool.query('insert into Dept values($1,$2)',[d_id,d_name]);
        res.send("<h1 color:'pink'> Successfully Dept details Added</h1>")
    }
    catch(err){
        console.log('Error in dept_add - '+err);
        res.status(400).send('Error in dept_add - '+err);
    }
})

app.post('/team_add',async(req,res)=>{
    let { t_id, curr_proj }=req.body;
    try{
        await pool.query('insert into Team values($1,$2)',[t_id,curr_proj]);
        res.send("<html><body><h1 color:'blue'> Successfully Team details Added</h1></body></html>")
    }
    catch(err){
        console.log('Error in team_add - '+err)
        res.status(400).send('Error in team_add - '+err);
    }
})

app.post('/emp_upd',async(req,res)=>{
    let { upde_id, e_id, e_name, ph_no, d_no, st, city, p_code, mail, sal, dt_join, d_id, t_id }=req.body;
    try{
        await pool.query('update Employee set e_id=$1, e_name=$2, ph_no=$3, d_no=$4, st=$5, city=$6, p_code=$7, mail=$8, sal=$9, dt_join=$10, d_id=$11, t_id=$12 where e_id=$13',[e_id, e_name, ph_no, d_no, st, city, p_code, mail, sal, dt_join, d_id, t_id,upde_id]);
        res.send("<html><body><h1 color:'blue'> Successfully Employee details Updated</h1></body></html>")
    }
    catch(err){
        console.log('Error in emp_upd - '+err);
        res.send("Error in emp_upd - "+err);
    }
})

app.post('/dept_upd',async(req,res)=>{
    let { updd_id, d_id, d_name }=req.body;
    try{
        await pool.query('update Dept set d_id=$1, d_name=$2 where d_id=$3',[d_id, d_name, updd_id]);
        res.send("<html><body><h1 color:'blue'> Successfully Department details Updated</h1></body></html>")
    }
    catch(err){
        console.log('Error in dept_upd - '+err);
        res.send("Error in dept_upd - "+err);
    }
})

app.post('/team_upd',async(req,res)=>{
    let { updt_id, t_id, curr_proj }=req.body;
    try{
        await pool.query('update Team set t_id=$1, curr_proj=$2 where t_id=$3',[t_id, curr_proj, updt_id ]);
        res.send("<html><body><h1 color:'blue'> Successfully Team details Updated</h1></body></html>")
    }
    catch(err){
        console.log('Error in team_upd - '+err);
        res.send("Error in team_upd - "+err);
    }
})

app.get('/fetch_all_dept',async(req,res)=>{
    let list;
    try{
        list=await pool.query('select * from Dept');
        res.send(list.rows);
    }
    catch(err){
        console.log('Error in dept_view - '+err);
        res.send("Error in dept_view - "+err);
    }
})


app.get('/fetch_all_team',async(req,res)=>{
    let list;
    try{
        list=await pool.query('select * from Team');
        res.send(list.rows);
    }
    catch(err){
        console.log('Error in team_view - '+err);
        res.send("Error in team_view - "+err);
    }
})

app.get('/fetch_all_emp',async(req,res)=>{
    let list;
    try{
        list=await pool.query('select * from emp1 order by d_name');
        res.send(list.rows);
    }
    catch(err){
        console.log('Error in emp_view - '+err);
        res.send("Error in emp_view - "+err);
    }
})

app.get('/emp_search',async(req,res)=>{
    let e_id=req.query.eid;
    let list;
    try{
        list=await pool.query('select * from emp1 where e_id=$1',[e_id]);
        res.send(list.rows);
        
    }
    catch(err){
        console.log('Error in emp_view - '+err);
        res.send("Error in emp_view - "+err);
    }
})

app.get('/emp_count',async(req,res)=>{
    let list;
    try{
        list=await pool.query('select d_name, count(*) as count from emp1 group by d_name');
        res.send(list.rows);
        
    }
    catch(err){
        console.log('Error in emp_count - '+err);
        res.send("Error in emp_count - "+err);
    }
})  

app.post('/emp_del',async(req,res)=>{
    let { e_id } = req.body;
    try{
        await pool.query('delete from Employee where e_id=$1',[e_id])
        res.send('<h1>Data deleted Successfully</h1>');
    }
    catch(err){
        console.log('Error in emp_del - '+err);
        res.send("Error in emp_del - "+err);
    }
})

app.post('/dept_del',async(req,res)=>{
    let { d_id } = req.body;
    try{
        await pool.query('delete from Dept where d_id=$1',[d_id])
        res.send('<h1>Data deleted Successfully</h1>');
    }
    catch(err){
        console.log('Error in Dept_del - '+err);
        res.send("Error in Dept_del - "+err);
    }
})

app.post('/team_del',async(req,res)=>{
    let { t_id } = req.body;
    try{
        await pool.query('delete from Team where t_id=$1',[t_id])
        res.send('<h1>Data deleted Successfully</h1>');
    }
    catch(err){
        console.log('Error in Team_del - '+err);
        res.send("Error in Team_del - "+err);
    }
})

app.post('/dh_login',async(req,res)=>{
    let {mail, pwd }=req.body;
    list=await pool.query('select pwd from login where mail = $1',[mail]);
    list=list.rows;
    if(list.length==0){ res.send('Username Not found'); }
    //console.log(list.pwd);
    else{
        if(pwd==list[0].pwd){ res.sendFile(__dirname+'/dept_all.html'); }
        else{ res.send('<h1><mark>Password wrong</mark> - Retry</h1>'); }
    }
 })

 app.get('/dept_search', async(req,res)=>{
        let d_id=req.query.did;
        let list_dt;
        let list;
    try{
        list_dt=await pool.query("select * from Dept where d_id=$1",[d_id])
        if(list_dt.rows.length==0){ res.send('{Error: Department Not found - Check For DEPT ID}')}
        else{
            list=await pool.query('select * from Employee where d_id = $1 order by e_name',[d_id]);
            res.send(list.rows);
        }
    }
    catch(err){
        console.log('Error in dept_search - '+err)
        res.status(400).send('Error in dept_search - '+err)
    }
 })

 app.post('/admin_sign_up',async(req,res)=>{
    let { mail, pwd, pwd1 }=req.body;
    try{
        pool.query('insert into login values($1,$2)',[mail,pwd])
        res.send('<h1>Successfully Submitted - login to access the site</h1>')
    }
    catch(err){
        console.log('Error in admin_sign_up'+err);
        res.status(400).send('Error in admin_sign_up'+err)
    }
 })


app.listen(5500,()=>{console.log('server started at port 5500')})

