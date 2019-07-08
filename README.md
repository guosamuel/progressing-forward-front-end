Progressing Forward
========================

Welcome to Progressing Forward! This is the front-end portion of this application.

## Description
Progressing Forward is a project-task tracking application for all projects that includes the logged in user. In order to make progress on a project, the user must update the project's respective task(s). The project lead has the authority to create new tasks for their respective projects as needed. This application was inspired by my experience in one of my previous jobs. There was always confusion as to which individual was involved in which project. With my new found knowledge of React and Ruby on Rails, I created this application to consolidate all users involved in their respective projects.

## Framework
Built with [React](https://reactjs.org/)

## Features
***Note:*** These are features of the overall application (i.e., front-end and back-end)

Collaborators - The project lead can add other users who are not already included in the project. When that user logs into their account, the project will be shown on the page.

Auto Progress - The overall progress of the project is automatically updated after updating a task. The task can also regress.

Interactive Feedback - Messages will appear on the page if the actions the user performed were successful or not.

Task Due Dates - The due date for each task can not be due later than its respective project due date.

Auto Filter - The project will be automatically rendered into the appropriate column depending on the project's progress.

## Installation
1. Install the [Progressing Forward Back-End](https://github.com/guosamuel/progressing-forward-back-end) server. Instructions will be in the repository's ReadMe. 
2. Fork and clone this repository into your local computer.
3. Navigate to the directory where it was cloned and run the following command: `npm install` (This may take a few minutes.)

## How To Use
1. Before starting the front-end, ensure that the back-end server is running on port 3000.
2. To run the back-front end, run the following command: `npm start`
3. The first page should look like the following picture below: 

![Log In Page](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/1.%20Log%20In%20Page.png)

4. You can either sign up as a new user or log in as an existing user. For demostration purposes, you can log in with the following account:

Username: ***Guest***

Password: ***123***

Once you log in, the page should now look like the following picture below:

![Main Page](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/2.%20Main%20Page.png)

To display the information of a project, click on its respective project button. The following picture below is an example of how a displayed project should look like.

![Project Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/3.%20Project%20Shown.png)

***Note: The picture already has some information populated from seed data. When a new project is created, it will look slightly different.***

Every project will have three buttons. These are "Add Collaborator(s)", "Show Edit Project Form: _Name of the Project_", and "Show _Name of the Project_ Task(s)".

#### Add Collaborator(s)

When you click on the "Add Collaborator(s)" button, it should look like the following picture below: 

![Adding Collaborators Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/4.%20Adding%20Collaborators%20Shown.png)

The list of collaborators is all of the existing users that are not currently involved in that project. Collaborators can also be filtered by typing in the text above the list of names. To select collaborator(s), you can select multiple collaborators and then click on the "Select" button ***OR*** individually double click each individual collaborator.

When all collaborators are selected, it should look like the following picture below:

![Selected Collaborators](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/5.%20Selected%20Collaborators.png)

Pressing the "X" button to the right of the collaborator's name will remove it from the list. After double-checking the selected collaborators, you can add them by selecting the "Add Collaborator(s)" button. Then, the collaborator list will be hidden and the selected collaborators will be appended to the list of the current collaborators. The picture below demonstrates this action:

![Successfully Added Collaborators](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/6.%20Successfully%20Added%20Collaborators.png)

#### Show Edit Project Form: _Name of the Project_
