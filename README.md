# 🐢 VivaVox 

###  VivaVox is a web AAC application to help kids with Cerebral Palsy (CP) and other communication disorders.

## About:
VivaVox is a low-cost web application for Augmentative Alternative Communication (AAC) designed to create simple, intuitive, and customizable communication boards. It offers a rich library of predefined cards and audio, user-defined images and sounds, and multiple scanning options, including blink-based and keyboard access.



## Stack:
The project uses the following languages and tools:
- **React** – Component-based library for building responsive web user interfaces  
- **React Native** – Component-based library for building responsive mobile user interfaces  
- **JavaScript** – Core programming language used across the application  
- **Node.js** – Backend runtime environment for handling server-side logic  
- **MongoDB** – Database used for storing and managing application data  

## Getting Started with Web application
These instructions will get you a copy of the project up and running on your local machine. 

**Access Requirement:** Connection is restricted by a firewall. You must have your public IP whitelisted and obtain a .env file to proceed. To request access, please email your IP address to leticiaadrianas@usp.br.

### Prerequisites
You need to have these follow tools installed
- [Node.js](https://nodejs.org) - latest version
- [Git](https://git-scm.com)
- [npm](https://www.npmjs.com/)

### Manual install
1. Clone the repo:
   `git clone https://github.com/brunaru/vivavox/`
2. Install client and server dependencies:
   ``` 
    npm install
    npm run install:all
   ```
3. Insert the .env file in the server directory 

### Auto install
You can automatically install prerequisites and npm packages by running the `setup.sh` script using

``` 
    chmod +x setup.sh
    ./setup.sh
``` 
Remember to insert the .env file in the server directory
### Usage
You will need two shells, run the following commands respectively:
   ``` 
      cd ~/vivavox/client/web
      npm run dev
   ```
   ```
      cd ~/vivavox/server
      node index.js
   ```
## Getting Started with Mobile application
In development... 🐢



## How to contribute 

We appreciate community contributions, feel free to study our project codebase, make a fork of the repository and make a pull request ❤️



### Branches and Commits

Dealing with branches and commits can be very confusing if standards are not established.  That's why we have some defined conventions.


#### Branches:

<table class="docutils data align-default">
<thead>
<tr class="row-odd"><th class="head"><p>Pattern</p></th>
<th class="head"><p>From</p></th>
<th class="head"><p>To</p></th>
<th class="head"><p>Description</p></th>
<th class="head"><p>Protected, Lifecycle</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>main</p></td>
<td><p>—</p></td>
<td><p>—</p></td>
<td><p>Main branch for tested and stable releases</p></td>
<td><p>Yes, Permanent</p></td>
</tr>
<tr class="row-odd"><td><p>develop</p></td>
<td><p>—</p></td>
<td><p>—</p></td>
<td><p>Main branch for development</p></td>
<td><p>Yes, Permanent until new vX</p></td>
</tr>
<tr class="row-even"><td><p>fea-description</p></td>
<td><p>develop</p></td>
<td><p>develop</p></td>
<td><p>Implementing new feature</p></td>
<td><p>No, Temporary</p></td>
</tr>
<tr class="row-odd"><td><p>fix-description</p></td>
<td><p>develop</p></td>
<td><p>develop</p></td>
<td><p>Fix in develop</p></td>
<td><p>No, Temporary</p></td>
</tr>
</tbody>
</table>


#### Commits:
<table class="docutils data align-default">
<thead>
<tr class="row-odd"><th class="head"><p>Pattern</p></th>
<th class="head"><p>Meaning</p></th>
<th class="head"><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>NEW or ADD:</p></td>
<td><p>Add</p></td>
<td><p>Add new files, classes, functions, methods</p></td>
</tr>
<tr class="row-odd"><td><p>DEL or REM:</p></td>
<td><p>Remove</p></td>
<td><p>Removing files, functions, class, methods</p></td>
</tr>
<tr class="row-even"><td><p>MOV:</p></td>
<td><p>Move</p></td>
<td><p>Moving the place of something</p></td>
</tr>
<tr class="row-odd"><td><p>FEA:</p></td>
<td><p>Feature</p></td>
<td><p>Creating a new behavior, implementing something new</p></td>
</tr>
<tr class="row-even"><td><p>FIX:</p></td>
<td><p>Fix</p></td>
<td><p>Fixing problems</p></td>
</tr>
<tr class="row-odd"><td><p>ENH:</p></td>
<td><p>Enhance</p></td>
<td><p>Not so important modifications, documentation, cleanup</p></td>
</tr>
<tr class="row-even"><td><p>MER:</p></td>
<td><p>Merge</p></td>
<td><p>Merge purposes</p></td>
</tr>
<tr class="row-odd"><td><p>DEP:</p></td>
<td><p>Deprecation</p></td>
<td><p>Add deprecation code</p></td>
</tr>
<tr class="row-even"><td><p>REF:</p></td>
<td><p>Refactor</p></td>
<td><p>Code refactoring</p></td>
</tr>
</tbody>
</table>

### Example of a branch creation and commit and push:

```
    git pull # Always remember to update your local repository
    git checkout -b fea-about-page # Creates and switches to the new branch
    # Code changes...
    git commit -m "ADD: about the project page" # Be clear with your commit message
    git push # Send all changes to the remote repository
```