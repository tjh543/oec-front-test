import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web"
import { QueryClient, QueryClientProvider } from 'react-query';

import keycloakClient from "./Keycloak"
const queryClient = new QueryClient()

import WelcomePage from "./pages/Homepage";
import './App.css';

function App() {
  

  return (
    <div className="App">
      <ReactKeycloakProvider authClient={keycloakClient}>
        <QueryClientProvider client={queryClient}>
          <WelcomePage />
        </QueryClientProvider>
      </ReactKeycloakProvider>
      
    </div>
  );
}

export default App;
