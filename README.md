
# Media Library Web Component 

A client framework and server agnostic Media library Web Component made with [vue3](https://v3.vuejs.org).

## Installation

Install ts-medialibrary with npm

```bash
  npm install ts-medialibrary
  import 'ts-medialibrary/dist/ts-medialibrary.js';

  <ts-medialibrary url="REST_URL_HERE"></ts-medialibrary>
```
    
## API Reference

### Client

| Props | Type | Default |  Description                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `url`     | `string` | none     | **Required**. REST Url to fetch and upload media |
| `label`   | `string` | Select File(s) | Upload Button Label |
| `title`   | `string` | Media Library | Library Modal Heading |
| `udpate-label`   | `string` | Click To Change | Upload Button Label after selections are made |
| `multiple`   | `string, boolean, number` | 0 | Allow multiple selection and upload |
| `preview-link`   | `string, boolean, number` | 1 | Open selected media in new tab 
| `allow-files`   | `boolean, number` | 0 | By default only images are allowed, Passing value of 1 will allow upload of any files defined in accept prop |
| `accept`   | `string` | `"image/*, audio/*, video/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .doc, .docx, .csv, .txt` | File types to accept when allow-files=1. Only for clientisde. For server validation you have to use your own. |


### Server
Server Api Reference. 

To test the library there is a default solution provided for laravel, You have to install one of my other package [Media Library Package](https://github.com/themightysapien/laravelmedialibrary) which comes with all required url actions.


#### Get all items

```http
  GET /PROPS_URL
```
##### Response
```json
{items: MediaResourceCollection[], success: 1}
```

#### Upload item

```http
  POST /PROPS_URL
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `files[]`      | `HTTPFile` | **Required**. array of files |
| `allow_files`      | `number(0, 1)` | If the upload should support only image or any files. |

##### Response
```json
{items: UploadedMediaResourceCollection[], success: 1, message: 'UPLOADED SUCCESS MESSAGE'}
```
#### Delete item

```http
  DELETE /PROPS_URL/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |
##### Response
```json
{ success: 1, message: "DELETED MESSAGE"}
```
#### Error Response
```json
{ error: 1, message: ERROR_MESSAGE}
```


## Tech Stack

**Client:** Vue3, Typescript, SCSS



## Demo

![SQ11g1JduD7-z-0-y-647a0fb8cfa57536f50cfc49](https://github.com/themightysapien/wcmedialibrary/assets/732813/68797d17-6a0d-46bc-b797-b87791f11f60)


## Acknowledgements

 - [Filament Admin Media Library](https://filamentphp.com/plugins/media-library-pro)
