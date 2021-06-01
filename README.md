# Meetify

[![Build Status](https://jenkins.webzyno.com/buildStatus/icon?job=KMU+Development+Team%2Fmeetify%2Fmaster)](https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/meetify/job/master/)
![GitHub](https://img.shields.io/github/license/KMU-Dev/meetify?color=blue)

Google Meet notification and auto message sending tampermonkey script.

Translations: [繁體中文](docs/README-zh_TW.md)

## Features

- [x] Send notification to you if there are many users sending message in a short time.
- [x] Auto send the message if many users are sending the same message.
- [ ] Reconize special template allowing meetify to roll call for you.

## Installation

### Install TamperMonkey on your Chrome/Edge

If you have installed TamperMonkey before, you can skip this step and directly install meetify.

Click following button to download Tampermonkey.

[![TamperMonkey](https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/mPGKYBIR2uCP0ApchDXE.png)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

### Add Meetify to TamperMonkey

Follow the link below and then click install button on TamperMonkey script installation page.

Download link: https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/meetify/job/master/lastSuccessfulBuild/artifact/dist/meetify.user.js

Fingerprint: https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/meetify/job/master/lastSuccessfulBuild/artifact/dist/meetify.user.js/*fingerprint*/

We use our Jenkins server to build this project. So if you are unsatisfied with that, you can build it on your own. Our project is open source!

## Bug report

Go to our [GitHub issue tracker](https://github.com/KMU-Dev/meetify/issues) and submit your issue.

## License

This project uses the following license: [MIT](LICENSE.md)
