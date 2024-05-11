import { GoogleLogout} from 'react-google-login'

 const clientId ="456884400275-6aia8a83henua9rr6ar13g2er7rh1g49.apps.googleusercontent.com"
 
 function LogOutButton() 
 {

    const onSuccess = (res) =>{
        console.log("Logut Success!");
    }
    
    return(
    <div id="signInButton">
        <GoogleLogout
            clientId={clientId}
            buttonText='LogOut'
            onLogoutSuccess={onSuccess}
        
        />
    </div>
    )
 }