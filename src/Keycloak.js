import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8090",
 realm: "DXC-POC",
 clientId: "sopl",
});

export default keycloak;