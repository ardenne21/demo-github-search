# Frontend Developer Assessment

## Introduction
This test is intended to assess your knowledge and skills as a Frontend Developer. We focus on:

* how you communicate
* how you structure your work
* the overall quality of your code, documentation and tests

Bonus questions are optional. 

## General requirements and scope
* Please push your work in a new branch containing your last name.
* Please don't commit the node_modules folder.

## Task

### Please create an Angular app that does the following:

 * The application should have 2 lazy loaded routes: /repos and /commits
 * In /repos, provide a table that allows you to search for repositories on Github using [their API](https://developer.github.com/v3/search/)
 * by name, optionally filtered by language and minimum number of stars 
 * by text contained in the title of an (open/closed) issue (e.g. you search for "octopress" and you get all the repositories that have issues containing that term)
 * Visualize the rows:
 * name of the repo
 * avatar of the owner
 * repo creation date
 * When clicking the table row, the /commits page should open for corresponding repo
 * In /commits, provide a table that allows you to search for commits of selected repository using [Github API](https://developer.github.com/v3/search/)
 * Visualize the rows:
 * commit author
 * url
 * commit message
 
### Bonus
 * Create the unit tests

## Requirements:

* Use Angular
* Use RxJS operators when makes sense (not just .subscribe())
* Use pure components with OnPush change detection strategy
* Pick the appropriate folder structure
* Use any additional libraries you like, but keep it as simple as possible