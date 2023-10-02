import { ToastContainer } from 'react-toastify';
import Loading from "./components/Loading";
import { useAuth } from "./hooks/use-Auth"
import Router from "./router/Router"

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading){
    return <Loading/>
  }
  return (
    <>
    <Router/>
    <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </>
  )
}
export default App
