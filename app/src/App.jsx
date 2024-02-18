import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../public/neo.css'
import ErrorSite from './ErrorSite.jsx'
import Skeleton from './Skeleton.jsx'
import Welcome from './Welcome.jsx'
import PostsList from './PostsList.jsx'
import PostView from './PostView.jsx'
import RestrictedRoute from './admin/RestrictedRoute.jsx'
import Login from './Login.jsx'
import Recovery from './Recovery.jsx'
import Panel from './admin/Panel.jsx'
import PostsAmd from './admin/PostsAmd.jsx'
import PostNew from './admin/PostNew.jsx'
import PostEdit from './admin/PostEdit.jsx'
import PostDelete from './admin/PostDelete.jsx'
import Profile from './admin/Profile.jsx'
import TeamAms from './admin/TeamAms.jsx'
import TeamNew from './admin/TeamNew.jsx'
import TeamEdit from './admin/TeamEdit.jsx'
import TeamDelete from './admin/TeamDelete.jsx'
import AdminRoleRoute from './admin/AdminRoleRoute.jsx'

const route = createBrowserRouter([
    {
        path: '/',
        element:  <Skeleton />,
        errorElement: <ErrorSite />,
        children: [
            {
                path: '/',
                element: <Welcome />
            },
            {
                path: 'posts',
                element: <PostsList />
            },
            {
                path: 'posts/:postId',
                element: <PostView />
            }
        ]
    },
    {
        path: '/admin',
        element:  <Skeleton />,
        children: [
            {
                path: '/admin',
                element: <Login />
            },
            {
                path: 'recovery',
                element: <Recovery />
            },
            {
                path: 'dashboard',
                element: <RestrictedRoute><Panel /></RestrictedRoute>
            },
            {
                path: 'posts',
                element: <RestrictedRoute><PostsAmd /></RestrictedRoute>
            },
            {
                path: 'posts/new',
                element: <RestrictedRoute><PostNew /></RestrictedRoute>
            },
            {
                path: '/admin/posts/edit/:userId/:postId',
                element: <RestrictedRoute><PostEdit /></RestrictedRoute>
            },
            {
                path: '/admin/posts/delete/:postId',
                element: <RestrictedRoute><PostDelete /></RestrictedRoute>
            },
            {
                path: '/admin/profile',
                element: <RestrictedRoute><Profile /></RestrictedRoute>
            },
            {
                path: '/admin/team',
                element: <RestrictedRoute><TeamAms /></RestrictedRoute>
            },
            {
                path: '/admin/team/new',
                element: <RestrictedRoute><AdminRoleRoute><TeamNew /></AdminRoleRoute></RestrictedRoute>
            },
            {
                path: '/admin/team/edit/:userId',
                element: <RestrictedRoute><AdminRoleRoute><TeamEdit /></AdminRoleRoute></RestrictedRoute>
            },
            {
                path: '/admin/team/delete/:userId',
                element: <RestrictedRoute><AdminRoleRoute><TeamDelete /></AdminRoleRoute></RestrictedRoute>
            }
        ]
    }
]) 

function App(){
    return (
        <RouterProvider router={route} />
    ) 
}

export default App