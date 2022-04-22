import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import SideBar from './Layouts/SideBar'
import Page from './Page'

const MainApp = () => {
  const { url } = useRouteMatch()

  return (
    <div className="w-screen overflow-hidden drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col w-full h-screen overflow-hidden grow drawer-content">
        <div className="h-full overflow-auto">
          <Suspense fallback={null}>
            <Switch>
              <Route path={url} exact>
                <div />
              </Route>
              <Route path={`${url}/new`}>
                <Page />
              </Route>
              <Route path={`${url}/:id`}>
                <Page />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
      <SideBar />
    </div>
  )
}

export default MainApp
