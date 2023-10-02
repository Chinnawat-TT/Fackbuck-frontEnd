

export default function RegisterInput( { type = 'text' , plancehoder , value ,onChange ,name ,hasError}) {
  return <input 
  type={type}
  placeholder={plancehoder} 
  value={value}
  onChange={onChange}
  name={name}
  className={`block w-full border rounded-md outline-none px-3 py-1.5 text-sm focus:ring ${ hasError ?  'border-red-500 focus:ring-red-300' : 'focus: ring-blue-300 focus:border-blue-500 border-gray-300' }`}/>
}
