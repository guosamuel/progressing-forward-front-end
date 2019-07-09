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
2. To run the front-end, run the following command: `npm start`
3. The first page should look like the following picture below: 

![Log In Page](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/1.%20Log%20In%20Page.png)

4. You can either sign up as a new user or log in as an existing user. For demostration purposes, you can log in with the following account:

Username: ***Guest***

Password: ***123***

Once you log in, the page should now look like the following picture below:

![Main Page](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/2.%20Main%20Page.png)

Each project is automatically filtered into one of the three columns based on its percentage. All projects with 0% will be filtered into the "TO DO PROJECTS" column. All projects between 0% and 100%, not inclusive, will be filtered into the "IN PROGRESS PROJECTS" column. All projects with 100% will be filtered into the "COMPLETED PROJECTS" column.

To display the information of a project, click on its respective project button. The following picture below is an example of how a displayed project should look like.

![Project Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/3.%20Project%20Shown.png)

***Note: The picture already has some information populated from seed data. When a new project is created, it will look slightly different.***

Every project will have three buttons. These are "Add Collaborator(s)", "Show Edit Project Form: _Project Name_", and "Show _Project Name_ Task(s)".

#### Add Collaborator(s)

When you click on the "Add Collaborator(s)" button, it should look like the following picture below: 

![Adding Collaborators Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/4.%20Adding%20Collaborators%20Shown.png)

The list of collaborators is all of the existing users that are not currently involved in that project. Collaborators can also be filtered by typing in the text above the list of names. To select collaborator(s), you can select multiple collaborators and then click on the "Select" button ***OR*** individually double click each individual collaborator.

When all collaborators are selected, it should look like the following picture below:

![Selected Collaborators](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/5.%20Selected%20Collaborators.png)

Pressing the "X" button to the right of the collaborator's name will remove it from the list. After double-checking the selected collaborators, you can add them by selecting the "Add Collaborator(s)" button. Then, the collaborator list will be hidden and the selected collaborators will be appended to the list of the current collaborators. The picture below demonstrates this action:

![Successfully Added Collaborators](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/6.%20Successfully%20Added%20Collaborators.png)

#### Show Edit Project Form: _Project Name_

When you click on the "Show Edit Project Form: _Project Name_" button, it should look like the following picture below: 

![Edit Project Form Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/7.%20Edit%20Project%20Form%20Shown.png)

After you have made your changes, click on the "Update Project: _Project Name_" button to submit the updated information. An alert will appear to let you know the status of the update. If it did not update successfully, please follow the instructions on the alert for a proper submission.

#### Show _Project Name_ Task(s)

When you click on the "Show _Project Name_ Task(s)" button, it should look like the following picture below:

![Tasks Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/8.%20Tasks%20Shown.png)

You have the option of creating a new task for the project or editing an existing task.

##### Creating a New Task

By clicking on the "Show New Task Form" button, the form for creating a new task shall display. It should look like the following picture below:

![New Task Form Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/9.%20New%20Task%20Form%20Shown.png)

After filling out all of the information, click on the "Submit New Task Form" button to submit the new information. An alert will appear to let you know the status of the submission. If it did not submit successfully, please follow the instructions on the alert for a proper submission.

***Note: The latest due date of a task can NOT exceed the due date of its respective project.***

Upon successful submission of a new task, the new task will be appended at the top of the current tasks. The following picture below describes said action:

![Successfully Added New Task](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/10.%20Successfully%20Added%20New%20Task.png)

##### Editing an Existing Task

By clicking on the "Show Edit Task Form" button, the form for editing a task shall display. It should look like the following picture below:

![Edit Task Form Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/11.%20Edit%20Task%20Form%20Shown.png)

All text fields will be auto-populated with its current text when the edit task form is shown.

***_Editing the task via task percentage is how a project percentage changes. The project percentage is the average of all its respective task percentages._***

After you have made your changes, click on the "Update Task: _Task Name_" button to submit the updated information. An alert will appear to let you know the status of the update. If it did not update successfully, please follow the instructions on the alert for a proper submission.

The following picture shows the task, "New Task", was updated to 100%.

![Succesfully Edited Task](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/12.%20Succesfully%20Edited%20Task.png)

***Note: The background color of each task changed colors because the project changed columns.***

After updating the new task, the project percentage will also be automatically updated. In this example, since the project percentage went from 0% to 33%, the project changed from the "TO DO PROJECTS" to the "IN PROGRESS PROJECTS" column, as shown below:

![Switched Columns](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/13.%20Switched%20Columns.png)

By using the same procedure, the project can be automatically filtered into the "COMPLETED PROJECTS" when all of its respective tasks are at 100%.

***Note: When editing a task, you may also regress the task's percentage. This may automatically filter the project back into the "TO DO PROJECTS" or "IN PROGRESS PROJECTS" column.***

##### Creating a New Project

To create a new project, click on the "Show New Project Form" button in the "TO DO PROJECTS' column and the form displays as shown below: 

![New Project Form Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/14.%20New%20Project%20Form%20Shown.png)

After filling out all of the information, click on the "Submit New Project Form" button to submit the new information. An alert will appear to let you know the status of the submission. If it did not submit successfully, please follow the instructions on the alert for a proper submission.

Upon successful submission of a new project, the new project will be appended at the top of the current projects. The following picture below describes said action:

![New Project Shown](https://github.com/guosamuel/progressing-forward-front-end/blob/master/READMEphotos/15.%20New%20Project%20Shown.png)

By default, a new project will not have any collaborators or tasks and the starting precentage will always be zero. Please refer to the approprirate sections when adding new collaborator(s) or task(s), as needed.

## Credits

Credits to the Flatiron School instructors, software engineering coaches, and my cohort for supporting and teaching me every step of the way. This project is a cumulation of the support and knowlege that I gained during my time in Flatiron School.
