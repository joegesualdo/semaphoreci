## semaphoreci 
> Unofficial SemaphoreCi node api.

## Install
```
$ npm install --save semaphoreci
```

## Usage
```javascript
var SemaphoreCi = require("semaphoreci").default

var config = {
  email: '<SEMAPHORE_EMAIL>',
  password: '<SEMAPHORE_PASSWORD>',
}
var projectName = '<INSERT_YOUR_PROJECT_NAME>'

var semaphoreCi = new SemaphoreCi(config);

semaphoreCi.createProject(projectName)
.then(function(){
  console.log("Created")
})
.catch(function(e){
  console.log(err)
})
```

## API
### `constructor(config)`
> Constructor function 

| Name | Type | Description |
|------|------|-------------|
| config | `object` | configuration (see possible key values below)|

##### Configuration keys
| Name | Type | Description |
|------|------|-------------|
| email | `string` | The email associated with your Semaphoreci account|
| password | `string` | The password associated with your Semaphoreci account|
| show | `boolean` | Option to view the browser actions (defaults to false)

Returns: `SemaphoreCi`, instance of semaphoreci 

```javascript
var SemaphoreCi = require("semaphoreci").default
var config = {
  email: '<SEMAPHORE_EMAIL>',
  password: '<SEMAPHORE_PASSWORD>',
}
var semaphoreCi = new SemaphoreCi(config);
```

### `createProject(name)`
> Create a project (project must already be on your github) 

| Name | Type | Description |
|------|------|-------------|
| name | `name` | the name of your project |

```javascript
var SemaphoreCi = require("semaphoreci").default

var config = {
  email: '<SEMAPHORE_EMAIL>',
  password: '<SEMAPHORE_PASSWORD>',
}
var projectName = '<INSERT_YOUR_PROJECT_NAME>'

var semaphoreCi = new SemaphoreCi(config);

semaphoreCi.createProject(projectName)
.then(function(){
  console.log("Created")
})
.catch(function(e){
  console.log(err)
})
```

## License
MIT © [Joe Gesualdo]()
