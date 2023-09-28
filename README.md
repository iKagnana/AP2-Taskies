# AP2-Taskies
React app for school project

## Deployement 
Deployed on Vercel.

## Features

### For Admin 
Admin can :
- Create user
- Update user
- Delete user
- Change task status
- Create task for everybody
- See their informations and task's statistics
- Change their password

### For User
3 differents roles : 
- Director
- Referent
- Employee

User in general can :
- Create task for themselves
- Update their task
- Delete their task
- Change the task status
- See their informations and task's statistics
- change their password

Referent are in charge of their pole, so they can create task for people from their pole. 
Director are in charge of the entire enterprise, so they can create task for all employees.

### Login
Whenever the user forgot their password, they can ask to change it through their email. 
They receive an email with a link to the page that allow the user to change their password. 
Be careful, the link is valid only once. If the user refresh the page or tries to change their password through an old link, the user is redirected to the login page.
