## Importing library
import os
import boto3
import regex as re
from flask import Flask
from flask_cors import CORS
from flask import request
import mysql.connector

## Defining the Flask app and enabling CORS
app = Flask(__name__)
CORS(app)

## The main function of Flask being triggered on URL calling
@app.route('/', methods=["GET"])
def hello_world():

    ## Assigning the AWS credentials
    ACCESS_KEY = 'ASIA4KBXBPQF3PKMU6FK'
    SECRET_KEY = 'XCNdWbbkIYy88FKJlVJMEDF3ZfrOu49gvmvQ+Fda'
    SESSION_TOKEN = 'FwoGZXIvYXdzEBkaDELXGqpdiaE8dK0G8SK+AbFru+CvvgNjF3fnSz7Lc/YCqNI4WIvlFEMwLqYYgKRqf7yr7zZGB/PyR/SeU+49JV6aXBBghTgoiFT7GxO6pyzVbm7L+9UmoeZX/uVg6NdK9J+Blej1TywPmMs2LYOXYWM2JDyvacP9Z7l3l3KcCD5t2sjYcrgnsnRKh8GC+a7U1MaqurP1840ckZvVI3GvmYYPUSiRrTliPEYnlskb6TFCQ35c0vE1SksiXoyTu9fIlU8o9cDMcPuaRCDrTTgowsr2+AUyLeVrAPAFZ/RBoZQyBX7WpVENTOr/kcda/pm1/qO58K0EK2v4Y77ApksQB9Na2A=='

    ## Fetching the files to the bucket named sample-data-b00841980
    s3 = boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, aws_session_token=SESSION_TOKEN)
    
    ## Creating a collective list of file contents
    words = ''
    bucket = s3.Bucket('data-processing-wordcloud')
    for obj in bucket.objects.all():
        file_contents = obj.get()["Body"].read()
        words = words + file_contents.decode("utf-8")
    
    ## Creating a collective list of the named entities
    regex = r"\b[A-Z][a-z]+\b"
    # This list of stop-words is a standardized list
    stop_words = ["", "a" , "able" , "about" , "above" , "according" , "accordingly" , "across" , "actually" , "after" , 
                  "afterwards" , "again" , "against" , "ain't" , "all" , "allow" , "allows" , "almost" , "alone" , "along" ,
                  "already" , "also" , "although" , "always" , "am" , "among" , "amongst" , "an" , "and" , "another" , "any" ,
                  "anybody" , "anyhow" , "anyone" , "anything" , "anyway" , "anyways" , "anywhere" , "apart" , "appear" ,
                  "appreciate" , "appropriate" , "are" , "aren't" , "around" , "as" , "aside" , "ask" , "asking" , "associated" ,
                  "at" , "available" , "away" , "awfully" , "'b" , "be" , "became" , "because" , "become" , "becomes" , "becoming" ,
                  "been" , "before" , "beforehand" , "behind" , "being" , "believe" , "below" , "beside" , "besides" , "best" ,
                  "better" , "between" , "beyond" , "both" , "brief" , "but" , "by" , "c'mon" , "c's" , "came" , "can" , "can't" ,
                  "cannot" , "cant" , "cause" , "causes" , "certain" , "certainly" , "changes" , "clearly" , "co" , "com" ,
                  "come" , "comes" , "concerning" , "consequently" , "consider" , "considering" , "contain" , "containing" , 
                  "contains" , "corresponding" , "could" , "couldn't" , "course" , "currently" , "definitely" , "described" , 
                  "despite" , "did" , "didn't" , "different" , "do" , "does" , "doesn't" , "doing" , "don't" , "done" , "down" ,
                  "downwards" , "during" , "each" , "edu" , "eg" , "eight" , "either" , "else" , "elsewhere" , "enough" , "entirely" ,
                  "especially" , "et" , "etc" , "even" , "ever" , "every" , "everybody" , "everyone" , "everything" , "everywhere" ,
                  "ex" , "exactly" , "example" , "except" , "far" , "few" , "fifth" , "first" , "five" , "followed" , "following" ,
                  "follows" , "for" , "former" , "formerly" , "forth" , "four" , "from" , "further" , "furthermore" , "get" , "gets" ,
                  "getting" , "given" , "gives" , "go" , "goes" , "going" , "gone" , "got" , "gotten" , "greetings" , "had" , "hadn't" ,
                  "happens" , "hardly" , "has" , "hasn't" , "have" , "haven't" , "having" , "he" , "he's" , "hello" , "help" , "hence" , "her" ,
                  "here" , "here's" , "hereafter" , "hereby" , "herein" , "hereupon" , "hers" , "herself" , "hi" , "him" , 
                  "himself" , "his" , "hither" , "hopefully" , "how" , "howbeit" , "however" , "i'd" , "i'll" , "i'm" , "i've" ,
                  "ie" , "if" , "ignored" , "immediate" , "in" , "inasmuch" , "inc" , "indeed" , "indicate" , "indicated" ,
                  "indicates" , "inner" , "insofar" , "instead" , "into" , "inward" , "is" , "isn't" , "it" , "it'd" , "it'll" ,
                  "it's" , "its" , "itself" , "just" , "keep" , "keeps" , "kept" , "know" , "known" , "knows" , "last" , "lately" ,
                  "later" , "latter" , "latterly" , "least" , "less" , "lest" , "let" , "let's" , "like" , "liked" , "likely" ,
                  "little" , "look" , "looking" , "looks" , "ltd" , "mainly" , "many" , "may" , "maybe" , "me" , "mean" ,
                  "meanwhile" , "merely" , "might" , "more" , "moreover" , "most" , "mostly" , "much" , "must" , "my" , "myself" ,
                  "name" , "namely" , "nd" , "near" , "nearly" , "necessary" , "need" , "needs" , "neither" , "never" ,
                  "nevertheless" , "new" , "next" , "nine" , "no" , "nobody" , "non" , "none" , "noone" , "nor" , "normally" ,
                  "not" , "nothing" , "novel" , "now" , "nowhere" , "obviously" , "of" , "off" , "often" , "oh" , "ok" ,
                  "okay" , "old" , "on" , "once" , "one" , "ones" , "only" , "onto" , "or" , "other" , "others" , "otherwise" ,
                  "ought" , "our" , "ours" , "ourselves" , "out" , "outside" , "over" , "overall" , "own" , "particular" ,
                  "particularly" , "per" , "perhaps" , "placed" , "please" , "plus" , "possible" , "presumably" , "probably" ,
                  "provides" , "que" , "quite" , "qv" , "rather" , "rd" , "re" , "really" , "reasonably" , "regarding" ,
                  "regardless" , "regards" , "relatively" , "respectively" , "right" , "said" , "same" , "saw" , "say" ,
                  "saying" , "says" , "second" , "secondly" , "see" , "seeing" , "seem" , "seemed" , "seeming" , "seems" ,
                  "seen" , "self" , "selves" , "sensible" , "sent" , "serious" , "seriously" , "seven" , "several" , "shall" ,
                  "she" , "should" , "shouldn't" , "since" , "six" , "so" , "some" , "somebody" , "somehow" , "someone" ,
                  "something" , "sometime" , "sometimes" , "somewhat" , "somewhere" , "soon" , "sorry" , "specified" ,
                  "specify" , "specifying" , "still" , "sub" , "such" , "sup" , "sure" , "t's" , "take" , "taken" , "tell" ,
                  "tends" , "th" , "than" , "thank" , "thanks" , "thanx" , "that" , "that's" , "thats" , "the" , "their" ,
                  "theirs" , "them" , "themselves" , "then" , "thence" , "there" , "there's" , "thereafter" , "thereby" ,
                  "therefore" , "therein" , "theres" , "thereupon" , "these" , "they" , "they'd" , "they'll" , "they're" ,
                  "they've" , "think" , "third" , "this" , "thorough" , "thoroughly" , "those" , "though" , "three" , "through" ,
                  "throughout" , "thru" , "thus" , "to" , "together" , "too" , "took" , "toward" , "towards" , "tried" ,
                  "tries" , "truly" , "try" , "trying" , "twice" , "two" , "un" , "under" , "unfortunately" , "unless" ,
                  "unlikely" , "until" , "unto" , "up" , "upon" , "us" , "use" , "used" , "useful" , "uses" , "using" , "usually" ,
                  "value" , "various" , "very" , "via" , "viz" , "vs" , "want" , "wants" , "was" , "wasn't" , "way" , "we" ,
                  "we'd" , "we'll" , "we're" , "we've" , "welcome" , "well" , "went" , "were" , "weren't" , "what" , "what's" ,
                  "whatever" , "when" , "whence" , "whenever" , "where" , "where's" , "whereafter" , "whereas" , "whereby" ,
                  "wherein" , "whereupon" , "wherever" , "whether" , "which" , "while" , "whither" , "who" , "who's" , "whoever" ,
                  "whole" , "whom" , "whose" , "why" , "will" , "willing" , "wish" , "with" , "within" , "without" , "won't" ,
                  "wonder" , "would" , "wouldn't" , "yes" , "yet" , "you" , "you'd" , "you'll" , "you're" , "you've" , "your" ,
                  "yours" , "yourself" , "yourselves" , "zero"]

    wordList = []
    wordFreq = []
    filtered_text = []
    # Applying regex to fetch words with first alphabet as Uppercase
    matches = re.finditer(regex, words)
    # Removing the stop-words
    for w in matches:
        if w[0].lower() not in stop_words:
            wordList.append(w[0])
    # Counting frequency of each word
    for w in wordList:
        wordFreq.append(wordList.count(w))

    ## Creating dictionary of named entities and their frequency
    wordDict = {}
    for i in range (0, len(wordList)):
        wordDict[wordList[i]] = wordFreq[i]
    
    ## Establishing connection with MySQL
    conn = mysql.connector.connect(
       user='root', password='mypassword', host='serverless-proj-user-management.c9hmikqpysoi.us-east-1.rds.amazonaws.com', database='wordcloud')

    ## Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    ## Preparing SQL query to INSERT a record into the database.
    sql1 = """DROP TABLE frequency"""
    sql2 = """CREATE TABLE frequency (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, entity VARCHAR(30) NOT NULL, count Int NOT NULL)"""
    cursor.execute(sql1)
    cursor.execute(sql2)

    for key in wordDict:
        sql = """INSERT INTO frequency (entity, count) VALUES (%s, %s)"""
        cursor.execute(sql, (key, wordDict[key]))

    try:
        # Commit your changes in the database
        conn.commit()

    except:
        # Rolling back in case of error
        conn.rollback()

    ## Closing the connection
    conn.close()
    
    ## Returning the dictionary of named entities and their frequency
    return wordDict

## Entry point to the code
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
    