import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth/AuthContext';
import { AlertProvider } from './context/alert/AlertContext';
import { ProjectProvider } from './context/project/ProjectContext';
import { TaskProvider } from './context/task/TaskContext';

import Login from './components/auth/Login';
import NewProfile from './components/auth/NewProfile';
import Projects from './components/projects/Projects';
import PrivateRoute from './components/routes/PrivateRoute';
import NotFound from './components/routes/NotFound';

import { setAuthToken } from './utils/httpClient';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <AlertProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/new-profile" component={ NewProfile } />
                <PrivateRoute exact path="/projects">
                  <Projects />
                </PrivateRoute>
                <Route component={ NotFound } />
              </Switch>
            </Router>
          </AlertProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
