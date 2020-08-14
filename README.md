# Oppia Integration on Google Assistant

This GitHub Repo caontains all of the code for the interactive canvas and firebase aspects of the Oppia on Assistant
integration project. To run this code, you will also need access to a DEV version of Oppia with some command -> 
function translation features (commandExecutorService in Oppia), as well as the oppiaassistant actions project. 

### Prerequisites

What things you need to install the software and how to install them

```
Oppia with Command Executor: https://github.com/oppia/oppia (explained below)
Firebase: https://firebase.google.com/
```

### Installing

First, deploy local version of oppia that contains the commandExecutor architecture. Here's the wiki, to which you
may refer to get started.: https://github.com/oppia/oppia/wiki. Keep in mind that Oppia does not work on Debian.
Create an exploration (lesson) on Oppia, and get the exploration ID from the url of the exploration.

Next, clone this repo onto your local machine. Go to public/index.html, and change the url to 
http://localhost:8181/embed/exploration/[explorationID]?secret_hostname=[SECRET].
Work with the oppia team to get the secret. 

After this, initialize a firebase project using firebase init. Choose the hosting and functions options, and do not
overwrite existing files. Then simply do firebase deploy.

Go to the oppiaassistant actions project (on actions builder console), and try it out by using the simulator!

### And coding style tests

Use ESLint for coding style checks!

## Deployment

Deploy directly on actions console, only AFTER oppia PR has gone through. Change the iframe url to hit an iframed oppia
page: https://oppia.org/embed/exploration/[exploration_id]?secret_hostname=[secret]

## Authors

* **Abhinav Gopal** - *Initial work* - abhinavg@berkeley.edu

## License

This project is owned by Google
