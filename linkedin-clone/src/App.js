import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {

   useEffect(()=>{            {/*For fetching logged in user info*/}
      props.getUserAuth();
   },[]);

  return (
     <Routes>
        <Route  path='/' element = {<Login />}/>
        <Route path='/home' 
         element = {[<Header />,<Home />]}
        />
     </Routes>
  );
}

const mapStateToProps = (state) =>{
   return {};
}

const mapDispatchToProps = (dispatch) =>({            //For dispatching the fetched user info
   getUserAuth : ()=> dispatch(getUserAuth()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);

