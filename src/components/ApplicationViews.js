import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { AddArticleForm } from './articles/ArticleForm'
import { EditArticleForm } from './articles/EditArticleForm'
import { MessageForm } from "./Messages/MessageForm"
import { TaskList } from "./tasks/TaskList"
import { Home } from './Home'
import { TaskForm } from "./tasks/TaskForm"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { UserList } from "./users/UserList"
import { EventList } from "./events/EventList"
import { AddEventForm } from "./events/EventForm"
import { EventEditForm } from "./events/EventEditForm"



export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  const setAuthUser = (user) => {
    sessionStorage.setItem("nutshell_user", JSON.stringify(user))
    setIsAuthenticated(sessionStorage.getItem("nutshell_user") !== null)
  }

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route exact path="/register" element={<Register />} />
        
        <Route exact path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route exact path="/articles" element={
            <PrivateRoute>
              <ArticleList />
            </PrivateRoute>
          } />
        <Route path="/addArticle" element={
            <PrivateRoute>
              <AddArticleForm /> 
            </PrivateRoute>
        } />
        <Route path="/:articleId/edit" element={
          <PrivateRoute>
              <EditArticleForm />
          </PrivateRoute> 
        } />

        <Route  path="/tasks" element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
        } />


        <Route  path="/tasks/create" element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
        } />

        <Route path="/tasks/:taskId/edit" element={
          <PrivateRoute>
            <TaskEditForm />
          </PrivateRoute>
        } />


        <Route  path="/friends" element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
        } />


        <Route  path="/messages" element={
            <PrivateRoute>
              <MessageForm />

            </PrivateRoute>
        } />
          
        <Route path="/addArticle" element={
            <PrivateRoute>
              <AddArticleForm /> 
            </PrivateRoute>
        } />
        <Route path="/:articleId/edit" element={
          <PrivateRoute>
              <EditArticleForm />
          </PrivateRoute> 
        } />


        <Route  path="/events" element={
            <PrivateRoute>
                <EventList />
              </PrivateRoute>
        } />

          <Route path="/events/create" element={
              <PrivateRoute>
                  <AddEventForm /> 
              </PrivateRoute>
        } />

          <Route path="/events/:eventId/edit" element={
              <PrivateRoute>
                  <EventEditForm />
              </PrivateRoute> 
          } />

        
      </Routes>
    </>
  )
}