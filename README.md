# Praktil REST API Documentation
Creator [Simple-MAX](https://github.com/Simple-MAX)
[API]('https://praktil-api.herokuapp.com/')
** **
## Open Endpoints
Open endpoints require no Authentication.

### Authentications endpoints
# User
| User | path |
|:----------|:-----|
|admin|admins|
|company|companies|
|user|companies|
 resources : `auth/user-type/signup`
### HTTP Request
Method : `POST`
Path : `protocol://example.domain/resources`
### Request parameters

In the request URL, provide the following query parameters with values.

| Parameter | Type | Description |
|:----------|:-----|:------------|
|email|string|user email|
|password|string|user password|

### Request body
Json object
### Example
```json
{
        "email":"example@example.com",
        "password":"passwrod"
}
```
##### Request URL PATH

```http
https://praktil-api.herokuapp.com/auth/user-type/signup
```

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

