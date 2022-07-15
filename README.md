# Optimizely Full Stack Feature Flags and Experimentation

[Optimizely Full Stack](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs) is a feature flagging and experimentation platform for websites, mobile apps, chatbots, APIs, smart devices, and anything else with a network connection.

You can deploy code behind feature flags, experiment with A/B tests, and roll out or roll back features immediately. All of this functionality is available with minimal performance impact via easy-to-use, open source SDKs.

## Optimizely + Akamai EdgeWorkers Starter Kit
The Optimizely starter kit for Akamai's Edge Workers embeds and extends our [Javascript Node SDK](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-sdk) to provide a starting point for you to implement experimentation and feature flagging for your experiences at the edge. For a guide to getting started with our platform more generally, this can be combined with the steps outlined in our [Javascript Quickstart](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-quickstart).

### Identity Management
Out of the box, Optimizely's Full Stack SDKs require a user-provided identifier to be passed in at runtime to drive experiment and feature flag decisions. This example generates a unique id, stores it in a cookie and reuses it to make the decisions sticky. Another common approach would be to use an existing unique identifier available within your application.

### Bucketing
For more information on how Optimizely Full Stack SDKs bucket visitors, see [here](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/how-bucketing-works).

## How to use

1. Create an [EdgeWorker ID](https://techdocs.akamai.com/edgeworkers/docs/create-an-edgeworker-id-1).

2. Add the [EdgeWorker Behavior](https://techdocs.akamai.com/edgeworkers/docs/add-the-edgeworker-behavior-1).

3. Download and install the [Akamai CLI](https://developer.akamai.com/getting-started/cli).

4. Install EdgeWorkers cli
    ```
    akamai install edgeworkers
    ```

5. Setup [Authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

6. Create a new folder and pull the code from this Starter kit.

    ```
    curl -L https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/zeeshan/initial-implementation | tar --strip-components=1 -zx
    ```

    or

    ```
    wget --no-check-certificate https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/zeeshan/initial-implementation -O - | tar --strip-components=1 -zx
    ```

7. Install node modules.
  
    ```
    npm install
    ```

8. Add your Optimizely SDK key and flag in [src/main.js](src/main.js).

9. Build the bundle.
  
    ```
    npm run build
    ```

10. Upload the bundle

    ```
    akamai edgeworkers upload --bundle="dist/bundle.tgz" {WORKER_ID}
    ```

11. Activate the version
    
    ```
    akamai edgeworkers activate {WORKER_ID} {ENVIRONMENT} {EDGEWORKER_VERSION}
    ```

    `WORKER_ID`: Unique ID for your EdgeWorker. This can be obtained from the Akamai control center.  
    `ENVIRONMENT`: The environment the EdgeWorker is being deployed on.  
    `EDGEWORKER_VERSION`: The custom version of the EdgeWorker as mentioned in `bundle.json`. This should be updated on every new deployment.  

12. Enable [Advanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) to receive debug logs in the response headers.

## Akamai EdgeWorkers
### Why use Akamai Edge Workers?
 - **Innovation**: Allows development teams to freely build logic safeguarded against unwanted usage through security protections provided by Akamai.
 - **Improved time to market**: Developers can manage Akamai and deliver their code in JavaScript without having to learn a new, propietary language. 
 - **Logic is executed close to users**: Code is sent across the world's largest distributed network, the Akamai Edge.
 - **Decreased overhead at origin**: Allows developers to create code and not worry about internal infrastructure or increased traffic at the origin.

### Akamai EdgeWorkers use cases
EdgeWorkers allow you to write and deploy JavaScript functions at the edge. For example use cases, refer to the [EdgeWorkers documentation](https://techdocs.akamai.com/edgeworkers/docs/limitations).

### Restrictions and Limitations 
- There are some restrictions to using EdgeWorkers. Read the [Akamai official documentation](https://techdocs.akamai.com/edgeworkers/docs/limitations) for the most recent product limits and resource tier limitations.

## Additional resources
- [Akamai Developer EdgeWorkers](https://developer.akamai.com/akamai-edgeworkers-overview)
- [Akamai EdgeWorkers official documentation](https://techdocs.akamai.com/edgeworkers/docs/welcome-to-edgeworkers)
- [Akamai EdgeWorkers with Optimizely](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/akamai)

## Contributing
Please see [CONTRIBUTING](CONTRIBUTING.md).