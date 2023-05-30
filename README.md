# Media Library Web Component 

This is framework agnostic Media library Web Component made with [vue3](https://v3.vuejs.org).

## Features
- Upload Media
- Remove Media
- Reuse already uploaded files 

## Installation

### Clientside
```
import 'tsmedialibrary/dist/ts-media-library.js';

<ts-media-library url="REST_URL_HERE"></ts-media-library>
````

### Serverside Setup and Api Architecture
To Quickly get started you can use a laravel installation with [Media Library Package](https://github.com/themightysapien/laravelmedialibrary) which comes with all required url actions.
- GET /URL Return Media collection
```
Response {items: MediaResourceCollection[], pagination?: PaginationResource, success: 1}
```
- POST /URL Upload media
```
Request files[] HttpFile
Response {items: UploadedMediaResourceCollection[], message?: 'Success Message', success: 1}
```
- DELETE /URL/:id
```
Response {message?:'Success Message', success: 1}
```
