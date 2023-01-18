import React from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from 'react-query';
import axios from "axios";

const fetchdata = async () => {
  let apiUrl = "http://localhost:8080/SOPL/common/getMasterCodeTable";
  let params = {
    "body": {
      "fieldName": "sales"
    }
  };
  const res = await axios.post(apiUrl, params);
  return res.data;
}

const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const { data, status, isLoading, isError, isSuccess, error } = useQuery(['fetchdata'], fetchdata);

  console.log({ data, status, isLoading, isError });
  console.log(keycloak.tokenParsed);
  
  if (isError) {
    console.log(error);
  }

 return (
  <>
      <div>
      <h1 className="">Welcome to SOPL test page with Keycloak</h1>
          <div className="">
              {!keycloak.authenticated && (
                <button
                  type="button"
                  className=""
                  onClick={() => keycloak.login()}
                >
                  Login
                </button>
              )}

              {!!keycloak.authenticated && (
                <button
                  type="button"
                  className=""
                  onClick={() => keycloak.logout()}
                >
                  Logout ({keycloak.tokenParsed.preferred_username})
                </button>
              )}
            </div>

            {!!keycloak.authenticated && (
              <div>
              <p>Custom Attributes: { keycloak.tokenParsed.test }</p>
              </div>
            )}
            
      </div> 
      <div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Fetching error</div>}
        {isSuccess && <div>Suc</div>}
      </div>
  </>
 );
};

export default Home;