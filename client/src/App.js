import React , {useState , useEffect , useReducer , createContext , useContext} from 'react';
import Navbar from './components/Navbar/Navbar';
import MovieSection from './components/Movie/Movie';
import Login from './components/Login/Login';
import { BrowserRouter, Route , Switch , useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { reducer, initialState } from './reducer/userReducer';
import Signup from './components/Signup/Signup';
import './App.css';
import Favourite from './components/Favourite/Favourite';

export const UserContext = createContext();



const Routing = ({setisSignin , searchmovies}) => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    console.log('serachmovies', searchmovies);
    useEffect(() => {
      fetch('/protected', {
        method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setisSignin(true);
            dispatch({ type: 'USER', payload: data.userdata });
          } else history.push('/');
        });
    }, []);
  return (
    <Switch>
      <Route
        path='/'
        exact
        render={() => <Login toggleSign={(value) => setisSignin(value)} />}
      />
      <Route
        path='/signup'
        exact
        render={() => <Signup toggleSign={(value) => setisSignin(value)} />}
      />
      <Route path='/home' exact render={() => <MovieSection searchmovies={searchmovies}/> } />
      <Route path='/favourite' exact component={Favourite} />
    </Switch>
  );
}
const App = () => {
  const [ isSignin , setisSignin] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchmovies, setsearchmovies] = useState(null);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Toaster
            position='top-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          {isSignin ? <Navbar setisSignin={setisSignin} handlesearch={(value) => setsearchmovies(value)} /> : null}
          <Routing setisSignin={setisSignin} searchmovies={searchmovies} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
