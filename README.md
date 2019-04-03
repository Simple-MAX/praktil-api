# Praktil REST API Documentation
Creator [Simple-MAX](https://github.com/Simple-MAX)
[API]('https://praktil-api.herokuapp.com/')
** **
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
  {"propName":"name","value","name2"},
  {"propName":"location","value","NYC"},
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