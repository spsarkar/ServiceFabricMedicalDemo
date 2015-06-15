# ServiceFabricMedicalDemo

This project demonstrates the usages of Azure Service Fabric to design a portable micro service application. This project uses modified version of some of the samples available at Azure Service Fabric examples (https://github.com/Azure/servicefabric-samples ). 

Included Projects
-----------------

ServiceFabricMedicalDemo  includes two service Fabric Application:

*  WebServiceFrontEndApplication Service Fabric Application - which includes the following projects. 
*   WebServiceFrontEndApplication
*   WebApplicationServer.WebService
*   WebApplicationServer.Service
*   WebApplicationServer.Common
*  ComputeEngineApplication Service Fabric Application - which the following projects
*   ComputeEngine.Interfaces
*   ComputeEngineApplication
*   ComputeEngineWebService
*   ComputeEngineActorService

Dependencies and Requirements
---------------------------
This project requires you to get Azure Service Fabric SDK installed in your development machine. Please follow the instructions ( https://azure.microsoft.com/en-us/documentation/articles/service-fabric-get-started/ ) to getting Service Fabric SDK installed. The project WebServiceFrontEndApplication uses RiotJs ( https://muut.com/riotjs/ ) and webpack ( http://webpack.github.io/ ).  The Javascript code lines are actually  build relies on nodejs ( https://nodejs.org/ ) npm to be installed in the development machine.

WebApplicationServer.WebService
---------------------------------
The web frondend ( WebServiceFrontEnd)  uses OAuth Authentication ( https://auth0.com/ ). 
