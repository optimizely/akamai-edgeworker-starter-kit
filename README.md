# Optimizely Full Stack Feature Flags and Experimentation

[Optimizely Full Stack](https://docs.developers.optimizely.com/full-stack/docs) is a feature flagging and experimentation platform for websites, mobile     apps, chatbots, APIs, smart devices, and anything else with a network connection.

You can deploy code behind feature flags, experiment with A/B tests, and roll out or roll back features immediately. All of this functionality is available with minimal performance impact via easy-to-use, open source SDKs.

# Optimizely Starter Kit
The Optimizely starter kit for Akamai's Edge Workers embeds and extends our [Javascript SDK](https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node) to provide a starting point for you to implement experimentation and feature flagging for your experiences at the edge. For a guide to getting started with our platform more generally, this can be combined with the steps outlined in our [Javascript Quickstart here](https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node).

### Identity Management
Out of the box, Optimizely's Full Stack SDKs require a user-provided identifier to be passed in at runtime to drive experiment and feature flag decisions. This example generates a unique id, stores it in a cookie and reuses it to make the decisions sticky. Another common approach would be to use an existing unique identifier available within your application.

### Bucketing
For more information on how Optimizely Full Stack SDKs bucket visitors, see [here](https://docs.developers.optimizely.com/full-stack/v4.0/docs/how-bucketing-works).

# How to use

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

    OR

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

    `WORKER_ID`: Unique ID for you edgeworker. This can be obtained from the Akamai control center.  
    `ENVIRONMENT`: The environment the edgeworker is being deployed on.  
    `EDGEWORKER_VERSION`: The custom version of the edge worker as mentioned in `bundle.json`. This should be updated on every new deployment.  

12. Enable [Advanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) to receive debug logs in the response headers.
