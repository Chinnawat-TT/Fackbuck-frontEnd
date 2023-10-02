import { useState } from "react";
import { toast } from "react-toastify"
import RegisterInput from "./RegisterInput";
import Joi from "joi"
import InputErrorMessage from "./InputErrorMessage";
import { useAuth } from "../../hooks/use-Auth";

const  registerScema = Joi.object({
    firstName : Joi.string().trim().required(),
    lastName : Joi.string().trim().required(),
    emailOrMobile : Joi.alternatives([
        Joi.string().email({tlds : false}),
        Joi.string().pattern(/^[0-9]{10}$/)
    ]).required(),
    password : Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
    confirmPassword : Joi.string().valid(Joi.ref('password')).trim().required(),   // strip() validate แล้วถูกไม่เอามา
    });

  const validateRegister = input =>{
    const { error } = registerScema.validate(input , { abortEarly : false })
    console.dir(error)
    if(error){
        const result = error.details.reduce((acc,el) =>{
            const { message , path} =el
            acc[path[0]]=message
            return acc
        },{})
        return result
    }

  }



export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error , setError]= useState({})

  const { register } = useAuth();

  // clone เเล้ว update
  const handleChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) =>{
    event.preventDefault()
    const validationError = validateRegister(input)
    if(validationError){
        return setError(validationError)
    }
    setError({})
    register(input).catch( err => {
        
        toast.error(err.response?.data.message)
    })
  }
  return (
    <form className=" grid grid-cols-2 gap-4" onSubmit={handleSubmitForm}>
      <div>
        <RegisterInput
          plancehoder="Firstname"
          value={input.firstName}
          onChange={handleChangeInput}
          name="firstName"
          hasError={error.firstName}
        />
        {error.firstName && <InputErrorMessage message ={error.firstName}/>}
      </div>
      <div>
        <RegisterInput
          plancehoder="Lastname"
          onChange={handleChangeInput}
          value={input.lastName}
          name="lastName"
          hasError={error.lastName}
        />
        {error.lastName && <InputErrorMessage message ={error.lastName}/>}
      </div>
      <div className=" col-span-full">
        <RegisterInput
          plancehoder="Email address or mobile number"
          onChange={handleChangeInput}
          value={input.emailOrMobile}
          name="emailOrMobile"
          hasError={error.emailOrMobile}
        />
        {error.emailOrMobile && <InputErrorMessage message ={error.emailOrMobile}/>}
      </div>
      <div className=" col-span-full">
        <RegisterInput 
        plancehoder="Password" 
        type="password" 
        onChange={handleChangeInput} 
        value={input.password} 
        name="password"
        hasError={error.password}
        />
        
        {error.password && <InputErrorMessage message ={error.password}/>}
      </div>
      <div className=" col-span-full">
        <RegisterInput 
        plancehoder="Confirm paaword" 
        type="password" 
        onChange={handleChangeInput} 
        value={input.confirmPassword} 
        name="confirmPassword"
        hasError={error.confirmPassword}
        />
        {error.confirmPasswordn && <InputErrorMessage message ={error.confirmPassword}/>}
      </div>
      <div className=" col-span-full mx-auto ">
        <button className=" bg-green-500 rounded-lg text-white px-3 py-1.5 font-bold text-lg min-w-[10rem]">
          Sign Up
        </button>
      </div>
    </form>
  );
}
