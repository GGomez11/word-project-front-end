export function validateEmail(email){
    if(email.length === 0) {
        return false
    }

    let lastAtPos = email.lastIndexOf("@")
    let lastDotPos = email.lastIndexOf(".")

    if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        return false
      } 

    return true
}

export function validatePassword(password){
    if(password.length < 6) {
        return false
    } else {
        return true
    }
}