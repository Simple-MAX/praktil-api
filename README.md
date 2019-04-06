# [Praktil](https://praktil-api.herokuapp.com/) Creator [Simple-MAX](https://github.com/Simple-MAX) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/react)
** **
### Getting Started with the Project

| Command | Description |
| ------- | ----------- |
| `npm install` | Install all needed dependencies |
| `npm start` | Starts the project on port 3000 |
| `npm api` | Starts the project api on port 8080 |


### Getting & Creating Projects

| Command | Description |
| ------- | ----------- |
| `git init` | Initialize a local Git repository |
| `git clone ssh://git@github.com/[username]/[repository-name].git` | Create a local copy of a remote repository |

### Basic Snapshotting

| Command | Description |
| ------- | ----------- |
| `git status` | Check status |
| `git add [file-name.txt]` | Add a file to the staging area |
| `git add -A` | Add all new and changed files to the staging area |
| `git commit -m "[commit message]"` | Commit changes |
| `git rm -r [file-name.txt]` | Remove a file (or folder) |

### Branching & Merging

| Command | Description |
| ------- | ----------- |
| `git branch` | List branches (the asterisk denotes the current branch) |
| `git branch -a` | List all branches (local and remote) |
| `git branch [branch name]` | Create a new branch |
| `git branch -d [branch name]` | Delete a branch |
| `git push origin --delete [branchName]` | Delete a remote branch |
| `git checkout -b [branch name]` | Create a new branch and switch to it |
| `git checkout -b [branch name] origin/[branch name]` | Clone a remote branch and switch to it |
| `git checkout [branch name]` | Switch to a branch |
| `git checkout -` | Switch to the branch last checked out |
| `git checkout -- [file-name.txt]` | Discard changes to a file |
| `git merge [branch name]` | Merge a branch into the active branch |
| `git merge [source branch] [target branch]` | Merge a branch into a target branch |
| `git stash` | Stash changes in a dirty working directory |
| `git stash clear` | Remove all stashed entries |

### Sharing & Updating Projects

| Command | Description |
| ------- | ----------- |
| `git push origin [branch name]` | Push a branch to your remote repository |
| `git push -u origin [branch name]` | Push changes to remote repository (and remember the branch) |
| `git push` | Push changes to remote repository (remembered branch) |
| `git push origin --delete [branch name]` | Delete a remote branch |
| `git pull` | Update local repository to the newest commit |
| `git pull origin [branch name]` | Pull changes from remote repository |
| `git remote add origin ssh://git@github.com/[username]/[repository-name].git` | Add a remote repository |
| `git remote set-url origin ssh://git@github.com/[username]/[repository-name].git` | Set a repository's origin branch to SSH |

### Inspection & Comparison

| Command | Description |
| ------- | ----------- |
| `git log` | View changes |
| `git log --summary` | View changes (detailed) |
| `git diff [source branch] [target branch]` | Preview changes before merging |

## Open Endpoints
Open endpoints require no Authentication.

## Authentications endpoints
### Quickstart for signup
Before you can run sign-up, you need to know your user type
|User-Type|Path|Description
|---------|----|------------
|`Admin`|`Admins`|a admin has permission to overwrite any record on the database
|`Company`|`Companies`|Companies has the permission to create job
|`User`|`users`|User has the permission to create application

* path auth/user-type/signup
* method  : POST
* payload : `json { "email":"test@test.com", "password":"password123" }` 
* ex `auth/users/signup`
##### Response
```json
{
      "message": "User created",
      "result": {
        "confirmed": false,
        "_id": "5ca41f73873c8c0004488a3e",
        "email": "example@example.com",
        "password": "$2b$10$/Fmi3DBpH0u2qMw7.t145envJUyzoAxQgqyoo.Ffc3u3woXgCF17e",
        "date": "2019-04-03T02:50:27.496Z",
        "__v": 0
      }
}
```
** **

### Quickstart for signin
Before you can run sign-in, you need to know your user type
|User-Type|Path|Description
|---------|----|------------
|`Admin`|`Admins`|a admin has permission to overwrite any record on the database
|`Company`|`Companies`|Companies has the permission to create job
|`User`|`users`|User has the permission to create application

* path auth/user-type/signin
* method  : POST
* payload : `json { "email":"test@test.com", "password":"password123" }` 
* ex `auth/users/signin`
#### Response
##### Token expires in 1h

```json
{
      "message": "Auth successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1Y2E0MWY3Mzg3M2M4YzAwMDQ0ODhhM2UifQ.WWBR_jQcZ2nAmkKYIsigq0eVOA17Te7mUuwf4YQGueo"
}
```

# Close Endpoints
Close endpoints require Authentication.

## Jobs
### get a list of all jobs
* path /jobs/list
* method  : GET
* require : token with in the header request
* ex `/jobs/list`
** **
### get a single jobs
* path /jobs/:jobId
* parameter : jobId
* method  : GET
* require : token with in the header request
* ex `/jobs/5ca41f73873c8c0004488a3e`
** **
### create a single jobs
* path /jobs
* method  : POST
* require : token with in the header request
* ex `/jobs`
* payload : form-data
``` json
{ 
  "profile_id" : "5ca41f73873c8c0004488a3e",
  "name" : "name",
  "description": "description",
  "location": "location",
  "contact_info": "contact_info",
  "category" : "category",
  "publish" : "false or true",
  "will_start_at" : "2019-01-01",
  "will_end_at" : "2019-03-01",
  "availability" : "2",
  "jobImage": "image"
} 
```
** **

### search for a job or jobs
* path /jobs
* method  : GET
* parameters : `name|location|date|category|availability`
* require : token with in the header request
* ex `/jobs?name=name`
** **

### update a job
* path /jobs/:jobId
* parameter : jobId
* method  : PATCH
* require : token with in the header request
* ex `/jobs/5ca41f73873c8c0004488a3e`
* payload : form-data
``` json
[
  {"propName":"name","value":"name2"},
  {"propName":"location","value":"NYC"},
]
```
** **

### Delete a job
* path /jobs/:jobId
* parameter : jobId
* method  : DELETE
* require : token with in the header request
* ex `/jobs/5ca41f73873c8c0004488a3e`
** **