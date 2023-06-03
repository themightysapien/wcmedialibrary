
# Media Library Web Component 

A client framework and server agnostic Media library Web Component made with [vue3](https://v3.vuejs.org).

## Installation

Install ts-medialibrary with npm

```bash
  npm install ts-medialibrary
```
Than include js in your page.
```javascript
  import 'ts-medialibrary/dist/ts-medialibrary.js';

  <ts-medialibrary url="REST_URL_HERE"></ts-medialibrary>
```

### Usage Example
#### Javascript
```html
<form>
  <ts-medialibrary
      multiple
      title="Library Demo For Github"
      url="http://dummy.dev/media"
    ></ts-medialibrary>
    <div id="fileinput"></div>
</form>

<script src="node_modules/ts-medialibrary/dist/ts-medialibrary.js"></script>
<script>
    customElements.whenDefined("ts-medialibrary").then((c) => {
      const el = document.querySelector("ts-medialibrary");

      if(el){
        el.addEventListener("updated", function (e) {
          const payload = e.detail[0];

          //appending hidden input insdie form
          document.getElementById("fileinput").innerHTML = payload.html;
        });
      }
      
    });
</script>
```
### Vue
```javascript
  import 'ts-medialibrary/dist/ts-medialibrary.js';

  <ts-medialibrary url="REST_URL_HERE" @updated="onSelectionChanged"></ts-medialibrary>
```
### React
You can either add ref to the ts-medialibrary and listen just like with js or can wrap and make reusable react component.
```javascript
import 'ts-medialibrary/dist/ts-medialibrary.js';

const MediaLibrary = ({ url, onChange }) => {
  const ref = useRef();


  useLayoutEffect(() => {
    const handleChange = customEvent => onChange(customEvent.detail[0]);

    const { current } = ref;

    current.addEventListener('updated', handleChange);

    return () => current.removeEventListener('updated', handleChange);
  }, [ref]);

   

  return (
    <ts-medialibrary
      ref={ref}
      url={url}
    />
  );
};
```
    
## API Reference

### Client

| Props | Type | Default |  Description                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `url`     | `string` | none     | **Required**. REST Url to fetch and upload media |
| `label`   | `string` | Select File(s) | Upload Button Label |
| `title`   | `string` | Media Library | Library Modal Heading |
| `udpate-label`   | `string` | Click To Change | Upload Button Label after selections are made |
| `input-name`   | `string` | files[] | input name which is used to return html string on update |
| `input-key`   | `string` | id | key from media object to be used as input value |
| `multiple`   | `string, boolean, number` | 0 | Allow multiple selection and upload |
| `preview-link`   | `string, boolean, number` | 1 | Open selected media in new tab 
| `allow-files`   | `boolean, number` | 0 | By default only images are allowed, Passing value of 1 will allow upload of any files defined in accept prop |
| `accept`   | `string` | `"image/*, audio/*, video/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .doc, .docx, .csv, .txt` | File types to accept when allow-files=1. Only for clientisde. For server validation you have to use your own. |

#### Emits
| Event | Payload | Description |
| :-------- | :------- | :----- |
| updated | selected: media[] | Arry of selected media `{id, url, thumb_url}[]`
|  | html: string | Hidden input string with `input-name` as key and value taken from `media[input-key]`

Events are dispatched as native CustomEvents on the custom element. Additional event arguments (payload) will be exposed as an array on the CustomEvent object as its detail property.
`const payload = e.detail[0];`
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
