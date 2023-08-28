const registerConstraints = {
    email: {
        presence: { allowEmpty: false, message: "is required." },
        email: { message: "^Enter a valid email." }
    },
    password: {
        length: {minimum: 8, maximum: 15, message: "^Must be between 8 and 15 characters"}
    }
};

export default registerConstraints