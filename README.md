<p align="center"> 

[![Build Status](https://travis-ci.org/qAIRa/qAIRaMap-OpenSource.svg?branch=master)](https://travis-ci.org/qAIRa/qAIRaMap-OpenSource)   [![Coverage Status](https://coveralls.io/repos/github/qAIRa/qAIRaMap-OpenSource/badge.svg?branch=master&kill_cache=1)](https://coveralls.io/github/qAIRa/qAIRaMap-OpenSource?branch=master)   [![Maintainability](https://api.codeclimate.com/v1/badges/5369a31696dfd8243c97/maintainability)](https://codeclimate.com/github/qAIRa/qAIRaMap-OpenSource/maintainability)

</p>

## qAIRaMap


Open source real-time website for monitoring air quality.

Real-time data from qHAWAX modules and Andean drones.

Download of historic data.

Visualization of results in Google Maps.

Data available: modules and drone in Madre de Dios (UNICEF project) and any other data from people using qairamap open source that have either a qHAWAX or Andean Drone

## Getting Started

Clone or download the project to the device where it will be used.

```
git clone https://github.com/qAIRa/qAIRaMap-Opensoure.git
```

### Prerequisites

Open a terminal inside the file that has been cloned to install the dependencies:

```
npm install

```

### Run the code locally

Now you can run webpack server

```
npm run serve
```

If everything went well, the following should come out

```
Project is running at http://localhost:8080/ (Press CTRL+C to quit)

```

## FAQs

### Current version

**Important:** The default version of the API may change in the future. If you're building an application and care about the stability of the API, be sure to fork the master branch.

### Media types

The Media Type is specified in header of request. The most basic media types the API supports are:

```js
application/json

Methode fetch:

body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
```

Neither of these specify a version, so you will always get the current default JSON representation of resources.


### Troubleshooting

If you're encountering some oddities in the API, here's a list of resolutions to some of the problems you may be experiencing.

* Why am I getting a 404?

The request could not be understood by the server due to malformed syntax. The client should not repeat the request without modifications

* Why am I not seeing all my results?

Most API calls accessing a list of resources (e.g., users, issues, etc.). If you're making requests and receiving an incomplete set of results, a response is specified in an unsupported content type.

* Why am I getting a 500?

Server Mistake - Indicates that something went wrong on the server that prevent the server from fulfilling the request.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Dont hesitate to contact us in [qAIRa Public Slack Channel](https://join.slack.com/t/qaira-publico/shared_invite/zt-e49w6375-9_vVmPdf8nFvXWfIvkagxw)

## Issues 

If you have found a bug in the project, you can file it here under the [“issues” tab](https://github.com/qAIRa/qAIRaMap-OpenSource/issues). You can also request new features here. A set of templates for reporting issues and requesting features are provided to assist you (and us!).

## Pull Requests 

If you have received a confirmation about your issue, you can file a pull request under the [“pull request” tab](https://github.com/qAIRa/qAIRaMap-OpenSource/pulls), please use the PR [“template”](https://github.com/qAIRa/qAIRaMap-OpenSource/blob/master/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md). 
You can also request new features here. 

## License

[GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
