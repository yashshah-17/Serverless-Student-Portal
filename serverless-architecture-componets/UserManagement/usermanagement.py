#User Management
import pymysql
import requests
import json
import sys
database = pymysql.connect("serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com","root","mypassword","serverless" )
cursor = database.cursor();

def hello_world(request):
    try:
        request_json = request.get_json()
        sign_up_details ={}
        sign_up_details['email'] = request_json['email']
        sign_up_details['password'] = request_json['password']
        sign_up_details['returnSecureToken']=False;
        cursor.execute("select * from user where email=%s",(sign_up_details['email']))
        result=cursor.fetchone()
        if result is None:
            print("not present")
            cursor.execute("INSERT INTO user (`email`,`password`,`firstname`,`secondname`,`organization`)VALUES(%s,%s,%s,%s,%s);",(sign_up_details['email'],
            sign_up_details['password'],request_json['firstName'],request_json['secondName'],request_json['organization']))
            database.commit()
            cursor.execute("INSERT INTO `userQuestion`(`email`,`questionID`,`answer`)VALUES(%s,%s,%s);",(sign_up_details['email'],
            request_json['questionID'],request_json['answer']))
            database.commit()
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAj4IznEqz1x1UCb5SohK4Kh9pYEWhlvx8"
            x = requests.post(url, data = json.dumps(sign_up_details))
            return ("True");
        else:
            print("User already exists")
            return("False")
    except:
        print("Oops!", sys.exc_info()[0], "occurred.")
		
