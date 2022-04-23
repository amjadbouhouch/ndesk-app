import FallBackSuspense from 'components/FallBackSuspense'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import 'store/index'
const MainApp = lazy(() => import('./MainApp'))

function App() {
  return (
    <Suspense fallback={<FallBackSuspense />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
          <Route path={'/app'}>
            <MainApp />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
