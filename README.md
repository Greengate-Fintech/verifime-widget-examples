# Verifyme Widget

VerifiMeWidget is an integral component of the VerifiMe platform, designed to simplify the integration of identity sharing and assessment services within your applications. By seamlessly embedding the VerifiMeWidget, you can easily guide your customers through the identity verification process, enabling them to share their credentials and undergo necessary assessments directly within your application's user interface. This streamlined approach enhances the user experience, improves data security, and accelerates the onboarding process for both you and your customers.

## Usage

To effectively utilize VerifiMeWidget, follow these general steps:

### Set up your Organization on VerifiMe

Create an organization account within the VerifiMe platform.
Configure necessary settings and obtain the required API credentials.

### Test the VerifiMe Experience

Integrate the VerifiMeWidget into a test environment within your application.
Thoroughly test the integration to ensure it functions as expected and meets your specific requirements.

### Start Onboarding Your Customers

Once testing is complete, deploy the VerifiMeWidget within your production environment.
Begin onboarding your customers using the streamlined identity verification process facilitated by the widget.

## Examples

Check https://github.com/Greengate-Fintech/verifime-widget-examples for details.

There are two ways to integrate VerifiMeWidget into your application:

### Using CDN

#### Import the Script:
```html
<script src="https://widget.static.main.verifime.com/widgets/verifime-widget.min.js"></script>
```

#### Create a Container:

```html
<div id="wrapper"></div>
```

This div element will act as the container for the VerifiMeWidget.

#### Generate Tracking Reference
You need to generate a unique tracking reference for each user verification process. You can achieve this in two ways:

- Backend API (Recommended): Use the provided API endpoint on your backend server to generate the tracking reference.

- Frontend Script: Implement logic within your frontend code to generate a unique tracking reference.

#### Render the Widget

```javascript
VerifiMeWidget("#wrapper", trackingReference);
```

Replace `#wrapper` with the actual css selector of your container div and `trackingReference` with the generated unique identifier.

#### Optional Callbacks

The VerifiMeWidget accepts an optional third parameter, which is an object containing two callback functions:

- `onError(error)`: This function will be called if any errors occur during the verification process. The error parameter will contain details about the encountered error.

- `onSuccess(data)`: This function will be called when the verification is successful. The data parameter will contain relevant information about the verified user and any granted permissions.

### Local Installation

#### Download the Widget

Download the verifime-widget.min.js file from https://widget.static.main.verifime.com/widgets/verifime-widget.min.js and save it locally in your project.

#### Import the Script
```html
<script src="path/to/verifime-widget.min.js"></script>
```

Replace `path/to/verifime-widget.min.js` with the actual path to the downloaded script file.

#### Using ES Modules

Download the ES Module bundle verifime-widget.esm.min.js from https://widget.static.main.verifime.com/widgets/verifime-widget.esm.min.js

#### Import the Module
```javascript
import VerifimeWidget from "path/to/verifime-widget.esm.min.js";
```
Replace `path/to/verifime-widget.esm.min.js` with the actual path to the downloaded script file.

#### Rest steps
Follow steps 2-5 from the CDN usage instructions above.


By following these steps and leveraging the capabilities of VerifiMeWidget, you can efficiently integrate identity sharing and assessment services into your applications, enhancing the user experience, improving security, and streamlining your overall business processes.


## Additional Notes
For security reasons, it's recommended to generate tracking references on your backend server rather than exposing the functionality in your frontend code.

Ensure your container div has sufficient space to accommodate the VerifiMeWidget UI.
Refer to the official VerifiMeWidget website or API documentation for detailed information about the returned data format in the onSuccess callback.

This documentation provides a basic overview of VerifiMeWidget usage. For further details and advanced functionalities, consult the official Verifime website or documentation.

