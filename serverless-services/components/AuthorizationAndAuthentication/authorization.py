#authorization

#signin first
import pymysql
import requests
import json


def hello_world(request):
    database = pymysql.connect("serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com","root","mypassword","serverless" )
    cursor = database.cursor(); 
    request_json = request.get_json()
    sign_in_details ={}
    sign_in_details['email'] = request_json['email']
    sign_in_details['password'] = request_json['password']
    sign_in_details['returnSecureToken']=True;
    #firebase sign in
    firebase="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAj4IznEqz1x1UCb5SohK4Kh9pYEWhlvx8"
    firebasesignin = requests.post(firebase, data = json.dumps(sign_in_details))
    response = json.loads(firebasesignin.text)
    if "error" in response:
        print("error")
        return x.text
    else:
        print(response)
        #question retrieval
        cursor.execute("select question,u.questionID from userQuestion u, securityQuestion q where u.questionID = q.questionID and email = %s;",
        (sign_in_details['email']))
        result = cursor.fetchone()
        if result is not None:
            print(result[0])
            question = result[0]
            questionID =result[1]
            response['question'] = question
            response['questionID'] = questionID
            cursor.execute("select * from user where email = %s;",(sign_in_details['email']))
            res = cursor.fetchone()
            response['firstName']=res[2]
            response['secondName']=res[3]
            response['organization']=res[4]
            
        return json.dumps(response)
		
#signin second        
import json
import pymysql


db = pymysql.connect("serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com","root","mypassword","serverless" )
cursor = db.cursor()

def lambda_handler(event, context):
        body = json.loads(event["body"])
        #body = event
        print(body["email"])
        #check question and answer
        cursor.execute("select 1 from userQuestion where email = %s and answer = %s; ",(body["email"],body["answer"]))
        result = cursor.fetchone()
        if result is not None:
            cursor.execute("select 1 from userOnline where email = %s ; ",(body["email"]))
            res = cursor.fetchone()
            if res is None:
                cursor.execute("insert into userOnline values(%s); ",(body["email"]))
                db.commit()
            return {
                'statusCode': 200,
                'body': json.dumps(True)
            }
        else:
             return {
                'statusCode': 200,
                'body': json.dumps(False)
            }
			

#online users			
import json
import pymysql




def lambda_handler(event, context):
        db = pymysql.connect("serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com","root","mypassword","serverless" )
        cursor = db.cursor()
        body = json.loads(event["body"])
        #get users from online table who are from the same organization
        cursor.execute("select u.email,firstname, secondname from user u, userOnline o where u.email = o.email and u.organization = %s; ",(body["organization"]))
        result = cursor.fetchall()
        online =[];
        for row in result:
            user = {}
            user["email"]=row[0]
            user["firstName"]=row[1]
            user["secondName"]=row[2]
            online.append(user)
        return {
            'statusCode': 200,
            'body': json.dumps(online)
        }

#logout      
import json
import pymysql


db = pymysql.connect("serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com","root","mypassword","serverless" )
cursor = db.cursor()

def lambda_handler(event, context):
        body = json.loads(event["body"])
        #log users out by deleting them from table
        cursor.execute("delete from userOnline where email = %s; ",(body["email"]))
        db.commit()
        return {
                'statusCode': 200,
                'body': json.dumps(True)
            }
        