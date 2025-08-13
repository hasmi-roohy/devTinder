function validateSignUpData(data) {
  const { firstName, lastName, email, password, gender } = data;

  if (!firstName || !lastName || !email || !password || !gender) {
    throw new Error("All fields are required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const allowedGenders = ["male", "female", "other"];
  if (!allowedGenders.includes(gender.toLowerCase())) {
    throw new Error("Invalid gender value");
  }
};

const validateEditProfileData=(req)=>{
  const allowedEditFields=["firstName","lastName","gender"];
 const isEditAllowed= Object.keys(req.body).every((field) =>allowedEditFields.includes(field));
 return  isEditAllowed;

 
}





module.exports = { validateSignUpData,validateEditProfileData };
