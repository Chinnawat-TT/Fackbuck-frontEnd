import { useRef, useState } from "react";

import FormButton from "./FormButton";

export default function PictureForm({ title, children }) {
  const inputEl = useRef(null);
  const [file,setFile]=useState(null);

  return (
    <div>
      <input
        type="file"
        className=" hidden"
        ref={inputEl}
        onChange={(event) => {
            if(event.target.files[0]){
                setFile(event.target.files[0])
            }
        }}
        // multiple             //เลือกรูปได้หลายรูปมากกว่า1

      />
      <div className=" flex items-center justify-between ">
        <h5 className="text-xl font-bold">{title}</h5>
        <div>
        {file && <> 
        <FormButton>Save</FormButton>
        <FormButton onClick={ ()=>{
          inputEl.current.value = ""                            //ทำให้ เลือกรูปเดิมได้
          setFile(null)
        }}>Cancel</FormButton>
        </>}
          <FormButton
            onClick={() => {
              inputEl.current.click();
            }}
          >
            Edit
          </FormButton>
        </div>
      </div>
      <div className=" flex justify-center">
        {children(file ? URL.createObjectURL(file) : undefined)}
        </div>
    </div>
  );
}
