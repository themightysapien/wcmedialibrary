
# Media Library Web Component 

A client framework and server agnostic Media library Web Component made with [vue3](https://v3.vuejs.org).

## Installation

Install ts-medialibrary with npm

```bash
  npm install ts-medialibrary
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
You can either add ref to the ts-medialibrary and listen just like with js or can wrap and make new HOC react component.
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
| `uid`     | `string` | default     | Unique identifer required for multiple instances in same page. |
| `label`   | `string` | Select File(s) | Upload Button Label |
| `title`   | `string` | Media Library | Library Modal Heading |
| `udpate-label`   | `string` | Click To Change | Upload Button Label after selections are made |
| `choosen`   | `string` | None | Comma separated id to preselect media. |
| `can-remove`   | `string, boolean, number` | 0 | Allow delete action if true |
| `blocking`   | `string, number, boolean` | 0 | If true than backdrop blocks the UI and modal stays open when clicking on it |
| `input-name`   | `string` | files[] | input name which is used to return html string on update |
| `input-key`   | `string` | id | key from media object to be used as input value |
| `multiple`   | `string, boolean, number` | 0 | Allow multiple selection and upload |
| `preview-link`   | `string, boolean, number` | 1 | Open selected media in new tab 
| `allow-files`   | `boolean, number` | 0 | By default only images are allowed, Passing value of 1 will allow upload of any files defined in accept prop |
| `accept`   | `string` | `"image/*, audio/*, video/*, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .doc, .docx, .csv, .txt` | File types to accept when allow-files=1. Only for clientisde. For server validation you have to use your own. |
| `limit`   | `number` | 50 | Number of max items to display in the library. Your server can return 100s of items but library will only show `limit` items. To see the remaining items, either have to search or sort.  |

#### Emits
| Event | Payload | Description |
| :-------- | :------- | :----- |
| updated | selected: media[] | Arry of selected media `{id, url, thumb_url}[]`
|  | html: string | Hidden input string with `input-name` as name and value mapped to `media[input-key]` |

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
{"items": "MediaResourceCollection[]", "success": 1}
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
{"items": "UploadedMediaResourceCollection[]", "success": 1, "message": "UPLOADED SUCCESS MESSAGE"}
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
{ "success": 1, "message": "DELETED MESSAGE"}
```
#### Error Response
```json
{ "error": 1, "message": "ERROR_MESSAGE"}
```

## Customization and Theming
| CSS Variable | Default     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `--tml-color-primary-rgb`      | `99, 102, 241` | Primary color RGB |
| `--tml-color-danger-rgb`      | `255, 0, 0` | Primary color RGB |
| `--tml-color-success`      | `green` | Success Color |
| `--tml-color-secondary`      | `rgb(249, 250, 251)` | Secondary Color |
| `--tml-color-grey`      | `grey` | Grey Color |
| `--tml-color-light`      | `#bbbbbb` | Light Color |
| `--tml-color-lighter`      | `#cccccc` | Lighter Color |
| `--tml-modal-z-index`      | 100 | Z-Index for modal |
| `--tml-modal-content-z-index`      | 10` | Z-Index for modal content |
| `--tml-modal-animation-duration`      | 0.3s | Modal open animation duration |
| `--tml-modal-background-color`      | `rgba(30, 30, 30, 0.8)` | Modal background color |
| `--tml-modal-width`      | `fit-content` | Modal width |
| `--tml-modal-min-width`      | `500px` | Modal min width |
| `--tml-modal-max-width`      | `100vw` | Modal max width |
| `--tml-modal-height`      | `80%` | Modal height  |

There are a lot more variables which will be updated soon.


## Tech Stack

**Client:** Vue3, Typescript, SCSS



## Demo

![SQ11g1JduD7-z-0-y-647a0fb8cfa57536f50cfc49](https://github.com/themightysapien/wcmedialibrary/assets/732813/68797d17-6a0d-46bc-b797-b87791f11f60)


## Acknowledgements

 - [Filament Admin Media Library](https://filamentphp.com/plugins/media-library-pro)
