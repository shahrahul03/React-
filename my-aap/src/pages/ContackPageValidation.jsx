// import React,{useState} from "react";

// export const FormValidation = ()=>{
//   const [formValues , setFormvalues]=useState({name:"", email:"", phone:"", message:""});
//   const[error, setErrors]= useState({});

  
// }
// export const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormValues({ ...formValues, [name]: value });
// }

// export const validate = () => {
//   let tempErrors = {};
//   if (!formValues.name) tempErrors.name = "Name is required";
//   if (!formValues.email) {
//     tempErrors.email = "Email is required";
//   if (!formValues.phone) {
//     tempErrors.email = "Email is required";
//   if (!formValues.message) {
//     tempErrors.email = "Email is required";
//   } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
//     tempErrors.email = "Email is invalid";
//   }
// }
//   }
//   setErrors(tempErrors);
//   return Object.keys(tempErrors).length === 0;
// };

// export const handleSubmit = (e) => {
//   e.preventDefault();
//   if (validate()) {
//     console.log("Form submitted successfully");
//     alert("Form submitted successfully");
//     setFormValues({name:"", email:"", phone:"", message:""});

//     // handle form submission
//   }
// };
