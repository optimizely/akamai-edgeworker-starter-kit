# Optimizely Full Stack Feature Flags and Experimentation

[Optimizely Full Stack](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs) is a feature flagging and experimentation platform for websites, mobile apps, chatbots, APIs, smart devices, and anything else with a network connection.

You can deploy code behind feature flags, experiment with A/B tests, and roll out or roll back features immediately. All of this functionality is available with minimal performance impact through easy-to-use, open source SDKs.

--- 

## Optimizely + Akamai EdgeWorkers Starter Kit

> Starter Kit for running Optimizely Full Stack feature flags and experiments on the [Akamai EdgeWorkers](https://developer.akamai.com/akamai-edgeworkers-overview) service.

The Optimizely starter kit for Akamai's Edge Workers embeds and extends our [Javascript Node SDK](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-sdk) to provide a starting point for you to implement experimentation and feature flagging for your experiences at the edge. For a guide to getting started with our platform more generally, this can be combined with the steps outlined in our [Javascript Quickstart](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-quickstart).

### Identity Management
Out of the box, Optimizely's Full Stack SDKs require a user-provided identifier to be passed in at runtime to drive experiment and feature flag decisions. This example generates a unique ID, stores it in a cookie and reuses it to make the decisions sticky. Alternatively, you can use an existing unique identifier available within your application and pass it in as the value for the `OPTIMIZELY_USER_ID` cookie.

### Bucketing
For more information on how Optimizely Full Stack SDKs assign users to feature flags and experiments, see [the documentation on how bucketing works](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/how-bucketing-works). 


## How to use

### Prerequisites
You will need have Optimizely account before following this starter kit. If you do not have an account, you can [register for a free account](https://www.optimizely.com/products/intelligence/full-stack-experimentation/).

### Get started
1. Create an [EdgeWorker ID](https://techdocs.akamai.com/edgeworkers/docs/create-an-edgeworker-id-1).

2. Add the [EdgeWorker Behavior](https://techdocs.akamai.com/edgeworkers/docs/add-the-edgeworker-behavior-1).

3. Install the [EdgeWorkers CLI](https://techdocs.akamai.com/edgeworkers/docs/akamai-cli#edgeworkers-cli).
    ```
    akamai install edgeworkers
    ```

4. Setup [Authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

5. Create a new folder and pull the code from this Starter kit.

    ```
    curl -L https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/zeeshan/initial-implementation | tar --strip-components=1 -zx
    ```

    or

    ```
    wget --no-check-certificate https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/zeeshan/initial-implementation -O - | tar --strip-components=1 -zx
    ```

6. Install node modules.
  
    ```
    npm install
    ```

7. Add your Optimizely SDK key and flag in [src/main.js](src/main.js). Your SDK keys can be found in the Optimizely application under **Settings**.

8. Build the bundle.
  
    ```
    npm run build
    ```

9. Upload the bundle

    ```
    akamai edgeworkers upload --bundle="dist/bundle.tgz" {WORKER_ID}
    ```

10. Activate the version
    
    ```
    akamai edgeworkers activate {WORKER_ID} {ENVIRONMENT} {EDGEWORKER_VERSION}
    ```

    `WORKER_ID`: Unique ID for your EdgeWorker. This can be obtained from the Akamai control center.  
    `ENVIRONMENT`: The environment the EdgeWorker is being deployed on.  
    `EDGEWORKER_VERSION`: The custom version of the EdgeWorker as mentioned in `bundle.json`. This should be updated on every new deployment.  

11. Enable [Advanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) to receive debug logs in the response headers.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).

## Additional resources

- [Akamai EdgeWorkers](https://developer.akamai.com/akamai-edgeworkers-overview)
- [Akamai EdgeWorkers official documentation](https://techdocs.akamai.com/edgeworkers/docs/welcome-to-edgeworkers)
- [Akamai EdgeWorkers with Optimizely documentation](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/akamai)
