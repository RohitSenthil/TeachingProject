# Teaching Project

![Home Page](/.github/screenshots/home-screen.png)

[playwithpython.org](playwithpython.org) is a website designed to teach Python basics in a fun and interesting way. The website features interactive informational pages with engaging questions and animations and coding questions to test users mastery of the concepts. The frontend layer is found in the [react-teaching](/react-teaching) folder and the backend api is found in the [python-api](/python-api) folder.

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

1. Clone the repository

```sh
    git clone https://github.com/RohitSenthil/TeachingProject.git 
```

2. Install the required dependencies in both folders

```sh
   #!/python-api
   npm install
   #!/react-teaching
   npm install
```

3. Run the index.js file from the python-api folder

```sh
  #!/python-api
  node index.js 
```

4. Create a .env file in the react-teaching folder with the link to the python-api server

```env
   #react-teaching/.env
   VITE_PYTHON_API_URL=YOUR_API_URL 
```

5. Build the website with vite in the react-teaching folder

```sh
   #!/react-teaching
   npm run dev
```

## Screenshots

![Instructional Page](/.github/screenshots/var-instruction.png)
![Editor Page](/.github/screenshots/editor.png)
![Editor Results Page](/.github/screenshots/editor-results.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
