# Optimizely Full Stack Feature Flags and Experimentation

[Optimizely Full Stack](https://docs.developers.optimizely.com/full-stack/docs) is a feature flagging and experimentation platform for websites, mobile     apps, chatbots, APIs, smart devices, and anything else with a network connection.

You can deploy code behind feature flags, experiment with A/B tests, and roll out or roll back features immediately. All of this functionality is available with minimal performance impact via easy-to-use, open source SDKs.

# Optimizely Starter Kit
The Optimizely starter kit for Akamai's Edge Workers embeds and extends our [Javascript SDK](https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node) to provide a starting point for you to implement experimentation and feature flagging for your experiences at the edge. For a guide to getting started with our platform more generally, this can be combined with the steps outlined in our [Javascript Quickstart here](https://docs.developers.optimizely.com/full-stack/v4.0/docs/javascript-node).

# How to use

1. Create an EdgeWorker ID by following the documentation [here](https://techdocs.akamai.com/edgeworkers/docs/create-an-edgeworker-id-1).

2. Add the EdgeWorker Behavior by following the documentation [here](https://techdocs.akamai.com/edgeworkers/docs/add-the-edgeworker-behavior-1).

3. Follow the documentation [here](https://developer.akamai.com/getting-started/cli) to download and install the akamai CLI.

4. Install EdgeWorkers cli
    ```
      akamai install edgeworkers
    ```

5. Setup Authentication credentials by following the documentation [here](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

6. Create a new folder and fetch the starter code from this template.

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

8. Add your Optimizely SDK key and flag in `src/main.js`.

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

12. To receive debug logs in the response headers, follow the documentation [here](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) to enable Advanced debug headers.