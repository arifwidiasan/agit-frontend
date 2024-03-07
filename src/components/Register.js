import { useState } from "react";
import { registerFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { api } from "../utils/api";
import Swal from "sweetalert2";

const fields = registerFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Register() {
  const [registerState, setRegisterState] = useState(fieldsState);

  const handleChange = (e) =>
    setRegisterState({ ...registerState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    createAccount();
  };

  //handle Register API Integration here
  const createAccount = async () => {
    console.log(registerState);
    try {
      let register = await api.post("register", registerState);
      await Swal.fire({
        icon: "success",
        title: "Behasil register, silakan login",
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.messages,
      });
    }
    setRegisterState(fieldsState);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={registerState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormAction handleSubmit={handleSubmit} text="Register" />
    </div>
  );
}
