from flask import Flask , render_template, redirect, url_for,session,flash
from flask_wtf import FlaskForm 
from wtforms import StringField,PasswordField,SubmitField
from wtforms.validators import DataRequired ,Email, ValidationError,Length,Regexp
import bcrypt
from flask_mysqldb import MySQL
app = Flask(__name__)

#mysql config
# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'yuktachoudhary@12'
app.config['MYSQL_DB'] = 'mydatabase'
app.secret_key = 'your_secret_key_here'

mysql = MySQL(app)

class RegisterForm(FlaskForm):
     name = StringField("Name",validators=[DataRequired()])
     email = StringField("Email",validators=[DataRequired(),Email()])
     password = PasswordField("Password",validators=[DataRequired(),
             Length(min=8, message="Password must be at least 8 characters long."),
             Regexp(r'^(?=.*[A-Z])', message="Password must contain at least one uppercase letter."),
             Regexp(r'^(?=.*[a-z])', message="Password must contain at least one lowercase letter."),
             Regexp(r'^(?=.*\d)', message="Password must contain at least one number."),
             Regexp(r'^(?=.*[@$!%*?&])', message="Password must contain at least one special character (@, $, !, %, *, ?, &)."),
             ],)
     submit = SubmitField("Register")
     
     def validate_email(self,field):
         cursor = mysql.connection.cursor()
         cursor.execute("SELECT * FROM users where email=%s",(field.data,))
         user = cursor.fetchone()
         cursor.close()
         if user:
             raise ValidationError('Email Already Exists..')
         
class LoginForm(FlaskForm):
     email = StringField("Email",validators=[DataRequired(),Email()])
     password = PasswordField("Password",validators=[DataRequired(),])
     submit = SubmitField("Login")
         
@app.route('/')
def index():
    return render_template('index.html')
  
@app.route('/register', methods=['GET','POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
       name=form.name.data
       email=form.email.data
       password=form.password.data
       
       hashed_password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
       
       #store data into database
       cursor = mysql.connection.cursor()
       cursor.execute("INSERT INTO users(name,email,password) VALUES (%s,%s,%s)",(name,email,hashed_password))
       mysql.connection.commit()
       cursor.close()
       
       return redirect(url_for('login'))
     
    return render_template('register.html',form=form)
  
@app.route('/login',methods=['GET','POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
       email=form.email.data
       password=form.password.data
             

       
       #store data into database
       cursor = mysql.connection.cursor()
       cursor.execute("SELECT * FROM users WHERE email=%s",(email,))
       user = cursor.fetchone()
       cursor.close()
       if user and bcrypt.checkpw(password.encode('utf-8'),user[3].encode('utf-8')):
          session['user_id'] = user[0]
          return redirect(url_for('dashboard'))
       else:
          flash("login failed.please check your email and password")
          return redirect(url_for('login')) 
        
  
     
    return render_template('login.html',form=form)
  
@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        user_id = session['user_id']
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users where id=%s",(user_id,))
        user = cursor.fetchone()
        cursor.close
        
        if user:
            return render_template('dashboard.html',user=user)
    
    return redirect(url_for('login'))
   
@app.route('/logout') 
def logout():
    session.pop('user_id',None)
    flash("You have been logged out successfully." )
    return redirect(url_for('login'))
@app.route('/about')
def about():
    return render_template('about.html')
if __name__ == "__main__":
  app.run(debug=True)