# DateNite

<b>Because Finding a Date is Hard Enough, Let Us Help You Plan One...</b>

Link to heroku - https://banana-crisp-94556.herokuapp.com/

DateNite is a date planning web application
that shows information about restraunts and activities for a certain location including links to their yelp page and an interactive map. This dat ais dynamically fetched using the GoogleMaps API and Yelp API.


React packages: react-router, react-bootstrap, react-icons, styled-components, loglevel, react-toastify 


## Installation

1. Clone project from git hub

```bash
  git clone https://github.com/kevintrinh388/Date-Nite-Activities.git
```
2. Install the following packages:

```bash
  pip install requests
  pip install python-dotenv
  pip install flask
  pip install flask-login
  pip install Flask-SQLAlchemy==2.1
  pip install psycopg2-binary
  sudo apt install postgresql
  sudo apt install npm
```
3. Create a .env file to store the following as environment variables:

```bash
  MAPS_KEY=""
  YELP_URL=""
  MY_DATABSE=""
  REACT_APP_CLIENT_ID=""
```
4. Run the command below in the main directory to pull in all the node packages you need.

```bash
  npm ci
```
5. To run the code, first run. Remember to run this command after any change in a React file.

```bash
  npm run build
```

6. Then run app.py.

```bash
  python3 app.py
```
## Authors
- [Nadia Faiz](https://github.com/nadiafaiz)
- [Nivin Kurien](https://github.com/starrugger)
- [Shubhada Mandala](https://github.com/smandala1)
- [Yalini Nadar](https://github.com/YaliniNadar)
- [Kevin Trinh](https://github.com/kevintrinh388)
------------

Developer commands:
1. Make code changes
2. Run `npm run build`
3. Run `npm ci`
4. Run `npm run watch`
5. Open new terminal tab, run `python3 app.py`
6. If there are no errors from the above commands, submit a pull request following the below commands


Useful Commands
```
git checkout -b feature 
git add --all
git commit -m "feature commit"
git push origin feature
```
