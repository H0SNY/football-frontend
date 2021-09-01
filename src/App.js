import "./App.css";
import { Footer, NavigationBar } from "./MainComponents/index";
import { Route, Switch } from "react-router-dom";
import {
  LeaguesSelectionView,
  LeagueView,
  MainView,
  AboutApp,
  TeamView,
} from "./Components/index";
import MainViewProvider from "./state/providers/MainViewProvider";
import LeaguesSelectionViewProvider from "./state/providers/LeaguesSelectionViewProvider";
import LeagueViewProvider from "./state/providers/LeagueViewProvider";
import TeamViewProvider from "./state/providers/TeamViewProvider";
function App() {
  return (
    <div className="App">
      <MainViewProvider>
        <LeaguesSelectionViewProvider>
          <LeagueViewProvider>
            <TeamViewProvider>
              <NavigationBar />

              <Switch>
             
              <Route path="/team/:leagueID/:teamID">
                  <TeamView />
                </Route>

                
                <Route path="/league/:leagueID">
                  <LeagueView />
                </Route>

              

                <Route path="/leagues">
                  <LeaguesSelectionView />
                </Route>


              

                <Route path="/aboutapp">
                  <AboutApp />
                </Route>

                <Route exact path="/">
                  <MainView />
                </Route>

              </Switch>

              <Footer/>
            </TeamViewProvider>
          </LeagueViewProvider>
        </LeaguesSelectionViewProvider>
      </MainViewProvider>
    </div>
  );
}

export default App;
