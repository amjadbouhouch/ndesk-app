import FallBackSuspense from 'components/FallBackSuspense'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
const MainApp = lazy(() => import('./MainApp'))
const isLoggedIn = true
function App() {
  return (
    <Suspense fallback={<FallBackSuspense />}>
      <BrowserRouter>
        <Switch>
          {/* <GuardedRoute
            path="/app"
            authorized={isLoggedIn}
            component={MainApp}
            redirectTo="/"
          /> */}
          <Route path={'/app'}>
            <MainApp />
          </Route>
          <Route path="/">
            <Redirect to="/app" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
