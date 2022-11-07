//console.log("hii")
//IIFE:immediatiy Invoked function
(function (){
let session=window.localStorage.getItem('session');
if((session==null) && (typeof(session)=='object')){
console.log('session does not exist');
if(window.location.pathname==getBaseurl('dashboard.html')){
    window.location.href='login .html#session.expired';
}


}
else{
    console.log('session exist', location.pathname);
    if(window.location.pathname=='/login.html')
    {
        window.location.href='dashboard.html#welcome-back';
    }
    else if(window.location.pathname=='/dashboard.html' || window.location.pathname=='/myprofile.html'
    
    
    )
    
    {
        let myinfo=$("#myinfo");
        let session=JSON.parse(window.localStorage.getItem('session'));
        let name=session.data.name;
        let email=session.data.email;
        myinfo.innerHTML="<b> Name:"+name+"<br/> Email:"+email+"<br/>";


    }
}

})();

//hash function
(function(){
    let hash =window.location.hash;
    if(hash=="#log-out"){
        success_alert("logout SuccessFully");
    }else if(hash=="#session-expired"){
        error_alert("Haramkhoor phley Login Karo");
    }else if(hash=="#login-success"){
        success_alert("LogIn ,Successfully");
    }
        else if(hash=="#welcome-back"){
                let session=JSON.parse(window.localStorage.getItem('session'));
                let email=session.data.email;
                success_alert(email+",welcome Back.");
            }
    
})();

var thread1;
function success_alert(msg){
let alert_spn=$("#alert");
alert_spn.setAttribute('class','success');
alert_spn.innerHTML="&check;"+msg;
alert_spn.style.display='block';


 thread1=setTimeout(function(){
    alert_spn.style.display='none';
 },3000);


}


var thread1;
function error_alert(msg){
let alert_spn=$("#alert");
alert_spn.setAttribute('class','error');
alert_spn.innerHTML="&cross;"+msg;
alert_spn.style.display='block';


 thread1=setTimeout(function(){
    alert_spn.style.display='none';
 },3000);


}

function gotoPage(pagename,msg){
    if (pagename == 'login'){
    
        window.location.href = pagename + '.html';
        return;//code execute stop.
    
    }else if(pagename == 'logout'){
    let status = window.confirm(msg);
    if(status){
        window.localStorage.removeItem('session');
    window.location.href='login.html#log-out';// jis page logout honey
    //bad jaye
    }
    }
    else{
        window.location.href = pagename + '.html';
        return;//code execute stop.
    }
    }
    function $(selctor){
    
        return document.querySelector(selctor);
    }


    //register usre
    function registerUser(e){
    e.preventDefault();//default behaviour ko stop krta hai
    
    let name= $("#name");//document.getElementById('name');
    console.log(name.value);
    
    let email= $("#email");
    console.log(email.value);
    
    let password= $("#password");
    console.log(password.value);
    
    let mobile= $("#mobile");
    console.log(mobile.value);
    
    
    var collections = JSON.parse(window.localStorage.getItem('user_data'))||[]
    console.log(collections);
    let users={
    name:name.value,
    email:email.value,
    password:password.value,
    mobile:mobile.value,
    }
    collections.push(users)
    window.localStorage.setItem('user_data',JSON.stringify(collections));
    success_alert("Registration successfully");
    
    }



    function contactusUser(e){
    
        e.preventDefault(); //default behaviour to Stop Kardo.
        let name = $("#name");
        //console.log(name.value);
        let email = $("#email");
        //console.log(email.value);
        let message = $("#message");
        //console.log(message.value);
        let mobile = $("#mobile");
        //console.log(mobile.value);
        var collections = JSON.parse(window.localStorage.getItem('contact_data')) || [];
        console.log(collections);
    
        let users = {
            name:name.value,
            email:email.value,
            message:message.value,
            mobile:mobile.value,
        }
        collections.push(users);
        window.localStorage.setItem('contact_data',JSON.stringify(collections));
        success_alert("Thank you for Contacting,Your Enquiry Send Successfully");
    
    }

    //login code
    function loginUser(e){
        e.preventDefault();//default behaviour ko stop krta hai  
    let email=$("#email");
    let password=$("#password");
    //console.log(email.value,password.value)
    
    let userCollection_str=window.localStorage.getItem('user_data');
    let userCollection_obj=JSON.parse(userCollection_str);
    
     let user_data = (findRecord(email,password,userCollection_obj));
        if(user_data){
    
    let session={
    data:user_data,
    is_login:true,
    }
    window.localStorage.setItem('session',JSON.stringify(session));

    window.location.href='dashboard.html#login-success';
     }else{
    error_alert('invalid user name or password');
     }
    }
    function findRecord(email,password,userCollection_obj){
    let position = -1;
    var counter = 0;
    try{
    for(;;){
    if(userCollection_obj[counter].email == email.value && userCollection_obj[counter].password == password.value){
    position = counter;
    console.log(position)
    break;
    }else{
       counter = counter + 1; 
    }
    if(counter == userCollection_obj.length){
        break;
    }
    }
    }catch(err){
        console.log("somthing went wrong");
    
    }
    if(position == -1){
        return false;
    //console.log('no record found');
    }else{
        //console.log(userCollection_obj[position]);
        return userCollection_obj[position];//user_email exist
    }
    }