from flask import Flask, render_template, request, redirect, url_for, request, session, abort, jsonify, json
from flaskext.mysql import MySQL
from functools import wraps
from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'projectdb1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.secret_key = 'why would I tell you my secret key?'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap


@app.route('/')
def home():
    is_session = None
    if session.get('logged_in') == True:
        is_session = True
    return render_template('index.html', is_session=is_session)



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == "GET":
        return render_template('signup.html')
    else:
        first_name = request.form['inputFirstName']
        last_name = request.form['inputLastName']
        name = request.form['inputUserName']
        password = request.form['inputPassword']

        # data = cursor.fetchall()
        query = "INSERT INTO user( name, password, role_id, first_name, last_name) VALUES (%s,%s, 2, %s,%s)"
        cursor.execute(query, (name, password, first_name ,last_name))

        # if len(data) is 0:
        conn.commit()
        return redirect(url_for('home'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get('logged_in'):
        return redirect(url_for('search'))
    else:
        error = ''
        if request.method == "POST":
            username = request.form['user']
            password = request.form['pass']
            query = "SELECT * FROM user WHERE name LIKE %s AND password LIKE %s"
            cursor.execute(query, (username, password))

            data = cursor.fetchall()
            # print data
            if data is None:
                print 'none'
                error = "Username or Password is wrong"
            else:
                print 'sesija'
                session['logged_in'] = True
                session['username'] = request.form['user']
                return redirect(url_for("search"))

        return render_template("index.html", error=error)


@app.route('/search')
@login_required
def search():
    is_session = None #sesija?
    if session.get('logged_in') == True:
        is_session = True

    query = "SELECT first_name, last_name, name, user_id FROM user"
    cursor.execute(query)

    data = cursor.fetchall()
    # data = jsonify(data)
    # print data
    return render_template('table.html', is_session=is_session, data=data)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect('/')


@app.route('/search_table/<term>')
def search_table(term):
    if term == "all":
        query = "SELECT first_name, last_name, name, user_id FROM user"
    else:
        query = "SELECT first_name, last_name, name, user_id FROM user WHERE first_name LIKE '%"+term+"%' or last_name  LIKE '%"+term+"%' or name  LIKE '%"+term+"%'"
    cursor.execute(query)

    data = cursor.fetchall()
    # data = jsonify(data)
    # print data
    return render_template("search_result.html", data=data)


@app.route('/delete_row', methods=['GET', 'POST'])
def delete_row():
    ids = request.form['data']
    ids = json.loads(ids)
    print ids
    for i in ids:
        print i
        query = "DELETE FROM user WHERE user_id = %s"
        cursor.execute(query, (i))
        conn.commit()
    query1 = "SELECT first_name, last_name, name, user_id FROM user"
    cursor.execute(query1)

    data = cursor.fetchall()
    print data
    return render_template('search_result.html', data=data)


@app.route('/get_user/<id>', methods=['POST'])
def get_user(id):
    query = "SELECT first_name, last_name, name, user_id FROM user WHERE user_id="+id
    cursor.execute(query)
    data=cursor.fetchall()
    print data
    return render_template('includes/update_table.html', data=data)

if __name__ == "__main__":
    app.run(debug=True)
