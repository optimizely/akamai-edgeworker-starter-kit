# Optimizely Akamai Edgeworkers Starter Kit

This repository houses the Akamai Edgeworkers Starter Kit which provides a quickstart for users who would like to use Optimizely Feature Experimentation and Optimizely Full Stack (legacy) with Akamai Edgeworkers.

Optimizely Feature Experimentation is an A/B testing and feature management tool for product development teams that enables you to experiment at every step. Using Optimizely Feature Experimentation allows for every feature on your roadmap to be an opportunity to discover hidden insights. Learn more at [Optimizely.com](https://www.optimizely.com/products/experiment/feature-experimentation/), or see the [developer documentation](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/welcome).

Optimizely Rollouts is [free feature flags](https://www.optimizely.com/free-feature-flagging/) for development teams. You can easily roll out and roll back features in any application without code deploys, mitigating risk for every feature on your roadmap.

## Get Started

Refer to the [Optimizely Akamai EdgeWorkers Starter Kit documentation](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/akamai-edgeworkers) for detailed instructions about using this starter kit.

### Prerequisites

1. You will need an **Optimizely Account**. If you do not have an account, you can [register for a free account](https://www.optimizely.com/products/intelligence/full-stack-experimentation/).

2. You will need to have an **Akamai Account with EdgeWorkers Access**. For more information, visit the official [Akamai Edgworkers product page here](https://www.akamai.com/products/serverless-computing-edgeworkers).

### Requirements

You must first have an Akamai EdgeWorker set up. To do so, you may take the following steps:

1. Create an [EdgeWorker ID](https://techdocs.akamai.com/edgeworkers/docs/create-an-edgeworker-id-1).

2. Add the [EdgeWorker Behavior](https://techdocs.akamai.com/edgeworkers/docs/add-the-edgeworker-behavior-1).

3. Install the [Akamai CLI](https://developer.akamai.com/getting-started/cli).

4. Install the [EdgeWorkers CLI](https://techdocs.akamai.com/edgeworkers/docs/akamai-cli#edgeworkers-cli).
    ```
    akamai install edgeworkers
    ```

5. Setup [Authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials).

### Install the Starter Kit

After you succesfully have an Akamai EdgeWorker set up, you can clone this starter kit, edit it, build it, and upload the build to your EdgeWorker.

6. Create a new folder and pull the code from this Starter kit.

    ```
    curl -L https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/main | tar --strip-components=1 -zx
    ```

    or

    ```
    wget --no-check-certificate https://github.com/optimizely/akamai-edgeworker-starter-kit/tarball/main -O - | tar --strip-components=1 -zx
    ```

7. Install node modules.
  
    ```
    npm install
    ```

8. Add your Optimizely SDK key and flag in [src/main.js](src/main.js). Your SDK keys can be found in the Optimizely application under **Settings**.

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

## Use the Akamai EdgeWorkers Starter Kit

The Optimizely starter kit for Akamai's EdgeWorkers embeds and extends our [Javascript (Node) SDK](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-sdk). For a guide to getting started with our platform more generally, you can reference our [Javascript (Node) Quickstart developer documentation](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/javascript-node-quickstart).

> Note: This starter kit in particular makes use of the "Lite" version of our Javascript SDK for Node.js which explicitly excludes the datafile manager and event processor features for better performance. As a result, it is expected that you will provide the datafile manually to the Optimizely SDK either through a local file reference or by using the provided platform-specific `getDatafile()` helper to load in your Optimizely project's datafile.

### Initialization

Sample code is included in `src/main.js` that shows examples of initializing and using the Optimizely JavaScript (Node) SDK interface for performing common functions such as creating user context, adding a notification listener, and making a decision based on the created user context.

Additional platform-specific code is included in `src/optimizely_helper.js` which provide workarounds for otherwise common features of the Optimizely SDK.

## Additional Resources and Concepts

### Identity Management

Out of the box, Optimizely's Feature Experimentation SDKs require a user-provided identifier to be passed in at runtime to drive experiment and feature flag decisions. This example generates a unique ID, stores it in a cookie and reuses it to make the decisions sticky. Alternatively, you can use an existing unique identifier available within your application and pass it in as the value for the `OPTIMIZELY_USER_ID` cookie.

### Bucketing

For more information on how Optimizely Feature Experimentation SDKs assign users to feature flags and experiments, see [the documentation on how bucketing works](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/how-bucketing-works). 

### Akamai EdgeWorkers

For more information about Akamai EdgeWorkers, you may visit the following resources:

- [Akamai EdgeWorkers Product Overview](https://developer.akamai.com/akamai-edgeworkers-overview)
- [Akamai EdgeWorkers Official Documentation](https://techdocs.akamai.com/edgeworkers/docs/welcome-to-edgeworkers)
- [Optimizely Akamai EdgeWorkers Starter Kit Documentation](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/akamai-edgeworkers)

## SDK Development

### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).

### Other Optimizely SDKs

- Agent - https://github.com/optimizely/agent

- Android - https://github.com/optimizely/android-sdk

- C# - https://github.com/optimizely/csharp-sdk

- Flutter - https://github.com/optimizely/optimizely-flutter-sdk

- Go - https://github.com/optimizely/go-sdk

- Java - https://github.com/optimizely/java-sdk

- JavaScript - https://github.com/optimizely/javascript-sdk

- PHP - https://github.com/optimizely/php-sdk

- Python - https://github.com/optimizely/python-sdk

- React - https://github.com/optimizely/react-sdk

- Ruby - https://github.com/optimizely/ruby-sdk

- Swift - https://github.com/optimizely/swift-sdk

### Other Optimizely Edge Starter Kits

- AWS Lambda@Edge - https://github.com/optimizely/aws-lambda-at-edge-starter-kit

- Cloudflare Workers - https://github.com/optimizely/cloudflare-worker-template

- Fastly Compute@Edge - https://github.com/optimizely/fastly-compute-starter-kit

- Vercel Functions - https://github.com/optimizely/vercel-examples/tree/main/edge-functions/feature-flag-optimizely