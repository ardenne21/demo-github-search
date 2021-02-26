import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Text } from "grommet";

const ReposComponent = React.lazy(() => import("./components/ReposComponent"));
const CommitsComponent = React.lazy(() =>
  import("./components/CommitsComponent")
);
export const baseURL = "https://api.github.com";

export const AppRouter = () => (
  <Switch>
    <Route exact path="/commits/:owner/:id">
      <Suspense fallback={<div>Loading...</div>}>
        <CommitsComponent />
      </Suspense>
    </Route>

    <Route exact path={"/repos"}>
      <Suspense fallback={<div>Loading...</div>}>
        <ReposComponent />
      </Suspense>
    </Route>

    <Route exact path={"/"}>
      <Suspense fallback={<div>Loading...</div>}>
        <ReposComponent />
      </Suspense>
    </Route>

    <Route exact path={"*"}>
      <Text>Not Found</Text>
    </Route>
  </Switch>
);
