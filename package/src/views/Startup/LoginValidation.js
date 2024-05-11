function Validation(values){
    let error = {}
   
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/

    if(values.username ===""){
       error.username = "Userneme should not be empty"
    }
    else {
       error.username = ""
    }

    if(values.password ===""){
       error.password = "Password should not be empty"
    }
    else {
       error.password = ""
    }
    
    return error;
}

export default Validation;
