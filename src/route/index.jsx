import React from 'react'
import { useRoutes } from 'react-router-dom'
export default function Myrouter () {
  const element = useRoutes([
    {
      path: '/',
      element: LazyLoad('view/index.jsx')
    },
    {
      path: '/My',
      element: LazyLoad('view/My.jsx')
    }
  ])
  return element
}

const LazyLoad = (path) => {
  const LazyComponent = React.lazy(() => import(`../${path}`))
  return (
            <React.Suspense fallback={<>...加载中</>}>
                <LazyComponent />
            </React.Suspense>
  )
}
