function Validation(values) {
    const errors = {}
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{8,})/;


    if (!gmailPattern.test(values.email)) {
        errors.email = "Invalid Format eg:(abc@gmail.com)"
    }

    if (!passwordPattern.test(values.password)) {
        errors.password = "Invalid Format (must have 8 character,1 capital, 1 special character)"
    }
    return errors
}
export default Validation;