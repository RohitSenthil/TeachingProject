# Teaching Project

[playwithpython.org](playwithpython.org) is a website designed to teach python basics in a fun and interesting way. The website features interactive informational pages with engaging questions and animations and coding questions to test users mastery of the concepts. The frontend website is found in the [react-teaching](/react-teaching) folder and the backend api is found in the [python-api](/python-api) folder.

## Technologies

The frontend uses

* React
* Material UI
* React-Spring
* Axios
* CodeMirror

The backend uses

* Express
* Cors
* Python-Shell

## Usage

1. cd into the python-api folder

```sh
   git clone https://github.com/your_username_/Project-Name.git 
```

2. Run the index.js file

```sh
   node index.js 
```

3. Create a .env file in the src folder in the react-teaching folder with the link to the python-api server

```env
   VITE_PYTHON_API_URL=YOUR_API_URL 
```

4. Build the website with vite in the react-teaching folder

```sh
   npm run dev
```

## Screenshoots

![Home Page](/github/screenshots/home-screen.png)
![Instructional Page](/github/screenshots/var-instruction.png)
![Editor Page](/github/screenshots/editor.png)
![Editor Results Page](/github/screenshots/editor-results.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
