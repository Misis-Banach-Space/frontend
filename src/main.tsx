import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { isAuthorizedMain } from './components/Authorized.tsx'

// const {isAuthorized, setAuthorized} = useContext(isAuthorizedMain);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <isAuthorizedMain.Provider value={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </isAuthorizedMain.Provider>
  </React.StrictMode>,
)


// const Root = () => {
//   const [isAuthorized, setAuthorized] = useState<boolean>(false);

//   return (
//     <React.StrictMode>
//       <isAuthorizedMain.Provider value={{ isAuthorized, setAuthorized }}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </isAuthorizedMain.Provider>
//     </React.StrictMode>
//   );
// };
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render
// ReactDOM.render(<Root />, document.getElementById('root'));