import Contacts from "../ListContacts/index";
import AuthPage from "../AuthPage";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Main() {
  const token = useSelector((state) => state.contacts.token);

  if (!token) {
    return (
      <Switch>
        <Route path="/signin">
          <AuthPage />
        </Route>
        <Redirect to="/signin" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/">
        <Contacts />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Main;
