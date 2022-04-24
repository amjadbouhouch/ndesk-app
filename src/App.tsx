import FallBackSuspense from 'components/FallBackSuspense'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { StoresProvider, stores } from './store/index'
const MainApp = lazy(() => import('./MainApp'))

function App() {
  return (
    <StoresProvider value={stores}>
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
    </StoresProvider>
  )
}

export default App
