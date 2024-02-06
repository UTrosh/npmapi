# What is it?
NPMAPI is a Node.js package designed to streamline interactions with Nginx Proxy Manager, a powerful reverse proxy software. This module simplifies the process of managing proxy configurations and provides an easy-to-use interface for automating tasks.

## How it Works
NPMAPI leverages the REST API of Nginx Proxy Manager, allowing seamless integration and communication with the proxy server. One notable feature is its automatic token refreshing mechanism, eliminating the need to restart NPMAPI every hour. This intelligent token management ensures a continuous and secure connection to the Nginx Proxy Manager, enhancing the overall user experience.

### Key Features:
- **Simplified Configuration:** NPMAPI abstracts the complexities of interacting with Nginx Proxy Manager, providing a straightforward and user-friendly interface for managing reverse proxy settings.

- **REST API Integration:** The module seamlessly integrates with the REST API of Nginx Proxy Manager, enabling efficient communication and interaction with the proxy server.

- **Token Auto-Refresh:** NPMAPI intelligently handles token refreshing, eliminating the need for manual intervention. This ensures a consistent and secure connection without the inconvenience of restarting the module every hour.

## Getting Started:
1. Install NPMAPI using npm:
```bash
npm install npmapi
```

2. Start using it:
```js
const { NPMAPI } = require('npmapi');

// Replace these values with your Nginx Proxy Manager credentials and API URL
const apiurl = 'https://your-nginx-proxy-manager-instance.com/api/';
const mail = 'your-email@example.com';
const password = 'your-password';

// Create an instance of NPMAPI
const npapiInstance = new NPMAPI(apiurl, mail, password);

// Login
npapiInstance.login()
```

Every methods are using refs/components of the nginx proxy manager api, you can find it at https://github.com/NginxProxyManager/nginx-proxy-manager/blob/develop/backend/doc/api.swagger.json#L1104

## Contributions:
Contributions and feedback are welcome! If you have ideas for improvements or encounter issues, please feel free to open an issue or submit a pull request.

## License:
This project is licensed under the MIT License.

## Author:
* UTrosh - Main Developper
* https://github.com/NginxProxyManager/nginx-proxy-manager/ - Nginx Proxy Manager
