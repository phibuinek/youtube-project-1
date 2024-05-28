import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SideBar from './components/Sidebar'
import { Container } from 'react-bootstrap'
import HomeScreen from './screen/HomeScreen'
import LoginScreen from './screen/LoginScreen'
import { Route, useNavigate} from 'react-router-dom'
import { BrowserRouter, Routes,Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchScreen from './screen/SearchScreen'

const Layout = ({children})=> {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar =() => toggleSidebar(!sidebar)
  return (
    <>
         <Header handleToggleSidebar={handleToggleSidebar}/>
         <div className=' flex'>
           <SideBar  sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
           <Container sidebar={sidebar} fluid className={`no-scrollbar overflow-y-scroll transform ${ sidebar ? "ml-[250px]" : ""}`}>
             {/* <HomeScreen/> */}
             {children}
           </Container>
         </div>
    </>
  )
}
const App = () => {
  
  // const {accessToken, loading} = useSelector(state=>state.auth)
  // const navigate = useNavigate()
  
  // useEffect(() => {
  //   if(!loading && !accessToken){
  //     navigate('/auth')
  //   }
  // },[accessToken,loading,navigate])
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar =() => toggleSidebar(!sidebar)
  return (
    
    // <div>
    //     <Header handleToggleSidebar={handleToggleSidebar}/>
    //     <div className=' flex h-full'>
    //       <SideBar className="bg-opacity-25 backdrop-blur-3xl mr-[200px]" sidebar={sidebar}/>
    //       <Container sidebar={sidebar} fluid className={`transform ${ sidebar ? "ml-[250px]" : ""}`}>
    //         <HomeScreen/>
    //       </Container>
    //     </div>
    // </div>
            <Routes>
              <Route path='/search/:query' exact element={                
                <Layout><SearchScreen/></Layout>}/>

                <Route path="/" exact element={
                  <Layout><HomeScreen/></Layout>
                }/>
                <Route path="/auth" element={<LoginScreen/>} />
            </Routes>
  )
}

export default App