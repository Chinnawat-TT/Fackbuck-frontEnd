import { useRef, useState } from "react";
import { useAuth } from "../../hooks/use-Auth";
import { ImageIcon } from "../../icons";

export default function PostForm() {
  const [file, setFile] = useState(null);
  const { authUser } = useAuth();
  const fileEl = useRef(null);
  return (
    <form className=" flex flex-col gap-4">
      <textarea
        className=" block w-full outline-none resize-none"
        rows="5"
        placeholder={`what's on your mind, ${authUser.firstName}`}
      />

      {file ? (
        <div onClick={ ()=> fileEl.current.click()} className=" cursor-pointer max-h-52 overflow-hidden"><img src={URL.createObjectURL(file)} alt="post" /></div>
      ) : (
        <SelectImageButton onClick={() => fileEl.current.click()} />
      )}

      <input
        type="file"
        className="hidden"
        ref={fileEl}
        onChange={(event) => {
          if (event.target.files[0]) {
            setFile(event.target.files[0]);
          }
        }}
      />
      <CreateButton>Post</CreateButton>
    </form>
  );
}
function CreateButton({ children }) {
  return (
    <button className=" bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 w-full rounded-lg font-bold">
      {children}
    </button>
  );
}

function SelectImageButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className=" bg-gray-200 hover:bg-gray-300 rounded-lg py-12 flex flex-col items-center cursor-pointer gap-2"
    >
      <div className=" bg-gray-400 h-10 w-10 rounded-full flex items-center justify-center">
        <ImageIcon />
      </div>
      <span>add photo</span>
    </div>
  );
}
