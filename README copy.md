# A working Akamai Edge Worker sample using Optimizely JS SDK.

This contains a working sample of Optimizely SDK on Akamai Edge Workers. This was part of an exercise to find out how compatible Optimizely Javascript SDK is with Akamai Edge Workers platform.

The functionality of SDK appears to be working correctly with some limitations in extended functionality.

## Limitations
1. Datafile manager is unable to fetch datafiles from CDN using its default request handler. Currently, there is no way to fix this without making a change to the SDK. This sample ignores datafile manager altogether and fetches the datafile explicitly using `httpRequest` utility provided by Akamai.

2. We are using rollup for packaging which uses browser package from optimizely SDK, which has some references to `window` object. This results in some errors in the code but it does not break any functionality. Though this does not cause any problem in functionality, we should still fix this in the SDK by adding additional null checks on window objects.

3. The event dispatcher does not work because Akamai does not allow http post subrequests from worker.

## Steps to Run

1. Create a new Edge Worker from Akamai Console.

2. Install npm packages
    ```
    npm install
    ```

3. To build and deploy a new version of worker.
    ```
    ./deploy.sh {WORKER_ID} {VERSION}
    ```
