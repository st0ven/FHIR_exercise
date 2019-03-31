# Health Records Lookup Application

### Overview
The purpose of this application is to author a simple application capable of hooking into CERNER's test health records database through its public API to expose mock patients and any corresponding medical health records. The exercise is intended to practice authoring simple services using async/await JS syntax, configure a complete application webpack setup with CI/CD support (utilizing heroku), and to practice using Vue as a DOM interaction library. 

Initially proposed as a code challenge which has been expanded upon to showcase a complete user experience.


-----


### Installation
- clone the repo
- open terminal and navigate to local root directory of the cloned repository
- `$ npm install`
- `$ npm run local`
- open browser of choice and navigate to `localhost.4000`


-----


### Roadmap

##### Phase 1
- Allow for simple name-based search of a patient, matching any results to any partial match of a patient's full name
- Support desktop utilizing CSS grid for responsive flow of layout

##### Phase 2
- Support more advanced search capabilities including matches against first or last name only, gender, age range and other inherent characteristics supported by the API
- Support mobile-specific layouts & design
