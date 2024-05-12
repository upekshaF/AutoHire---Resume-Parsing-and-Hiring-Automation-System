import {GoogleLogin} from 'react-google-login'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

 const clientId ="456884400275-6aia8a83henua9rr6ar13g2er7rh1g49.apps.googleusercontent.com"
 
 function LoginButton() 
 {
    const navigate = useNavigate();
    // Function to generate password
const generatePassword = async(username, userId) => {
    // Concatenate username and userId
    const combinedString = `${username}${userId}`;
    // For simplicity, let's use a basic hashing function
    const hashedPassword = hashString(combinedString);
    return hashedPassword;
  };
  
  // Dummy hash function, replace this with a proper hashing function
  const hashString = (str) => {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  };
  
  

    const onSuccess =async (res) =>{

            console.log(res.profileObj)
           const username = res.profileObj.givenName;
           const email=  res.profileObj.email;
           const password= await generatePassword(res.profileObj.givenName,res.profileObj.googleId);

           console.log(password)
          
        
       
       try  {
        axios.post('https://resume-parser-mw16.onrender.com/api/signup', {username : username, email : email, password : password, is_admin : 0,is_recruiter : 1})
        .then(res => {

          
            console.log(res.data)
           
            handleLogin(username, password)
            })
            .catch(err => console.log(err));
    

        }
        catch 
        {
            console.log("error")
        }
    }
    const handleLogin = async (username,password) => {
    
      
    
    
          
      try {
          const response = await axios.post('https://resume-parser-mw16.onrender.com/api/login', {
              username: username,
              password: password
          });
          console.log(response.data)
          if (response.data.message === 'success') {
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "You have been successfully Logged In!",
                  showConfirmButton: false,
                  timer: 3000
              });
              localStorage.setItem('userId', response.data.user.user_id);
              localStorage.setItem('isAdmin', response.data.user.is_admin);
              navigate('/starter');
          } 
           
      } catch (error) {
        
          // Display error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password!',
          });
      }
    
  };
  
    const onFailure = (res) => {
        console.log("Login Failed", res)
    }
    return(
    <div id="signInButton" >
        <GoogleLogin
            className="btn btn-default border w-100 bg-white justify-content-center text-decoration-none "
            clientId={clientId}
            buttonText='Login Using Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        
        />
    </div>
    )
 }
 export default LoginButton