import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StateHookConst from './hookpages/StateHook';
import ReducerHookConst from './hookpages/ReducerHook';
import HomePage from './hookpages/HomePage';
import NavigationBar from './components/NavigationBar';
import ContextHook from './hookpages/ContextHook';
import CallBackHook from './hookpages/CallbackHook';
import RefHook from './hookpages/RefHook';
import EffectHook from './hookpages/EffectHook';
import MemoHook from './hookpages/MemoHook';
import ImperativeHandle from './hookpages/ImperativeHandle';

function App() {
  return (
    <BrowserRouter>

      <NavigationBar />

      <div className="App">
        <Switch>
          <Route exact path="/"> <HomePage /> </Route>
          <Route path="/StateTutorial"> <StateHookConst /> </Route>
          <Route path="/ReducerTutorial"> <ReducerHookConst /> </Route>
          <Route exact path="/ContextTutorial"> <ContextHook /> </Route>
          <Route exact path="/CallBackTutorial"> <CallBackHook /> </Route>
          <Route exact path="/CallBackTutorial"> <CallBackHook /> </Route>
          <Route exact path="/RefTutorial"> <RefHook /> </Route>
          <Route exact path="/EffectTutorial"> <EffectHook /> </Route>
          <Route exact path="/MemoTutorial"> <MemoHook /> </Route>
          <Route exact path="/ImperativeHandle"> <ImperativeHandle /> </Route>

        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
