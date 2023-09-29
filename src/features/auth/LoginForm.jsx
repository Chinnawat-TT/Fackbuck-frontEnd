import { useState } from "react";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-Auth";

export default function LoginForm() {

  const [input, setInput] = useState({
    emailOrMobile: "",
    password: "",
  });

  const { login } =useAuth();

  const handleSubmitForm= event =>{
    event.preventDefault();
    login(input)
  }
  return (
    <form className="grid gap-4" onSubmit={handleSubmitForm}>
      <LoginInput
        placeholder="Email address or phone number"
        value={input.emailOrMobile}
        onChange={e => setInput({...input, emailOrMobile: e.target.value })}
      />
      <LoginInput
        type="password"
        placeholder="Password"
        onChange={e => setInput({...input, password: e.target.value})}
      />
      <LoginButton />
    </form>
  );
}
