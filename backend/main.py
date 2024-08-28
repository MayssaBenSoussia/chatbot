from fastapi import FastAPI
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class RequestObject(BaseModel):
    user_message:str 

app = FastAPI()

load_dotenv('.env')
class Envs:
    LOGIN = os.getenv('LOGIN')
    PASSWORD = os.getenv('PASSWORD')
    SENDER_EMAIL = os.getenv('SENDER_EMAIL')
    RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL')
    SERVER = os.getenv("SERVER")
    PORT = os.getenv("PORT")
    FRONTURI = os.getenv("FRONTURI")

print(Envs.LOGIN)  
app.add_middleware(
    CORSMiddleware,
     allow_origins=Envs.FRONTURI,
    allow_methods=["*"]
)
message = MIMEMultipart("alternative")
message["Subject"] = "Visitor needs support"
message["From"] = Envs.SENDER_EMAIL
message["To"] = Envs.RECEIVER_EMAIL
  
@app.get("/send-email")
def getmail():return {"msg":"send mail"}

@app.post("/send-email")
def send_email(email_content: RequestObject):
    
  
     # write the HTML part
    html = (
    
        """<html>"""
        """<body>"""
            f"""<p>{email_content}</p>"""
        """</body>"""
        """</html>"""
        
        )
    message.attach(MIMEText(html, "html"))
  
    server = smtplib.SMTP(Envs.SERVER, Envs.PORT)
    server.esmtp_features['auth'] = 'LOGIN DIGEST-MD5 PLAIN'
    server.login(Envs.LOGIN, Envs.PASSWORD)
    server.sendmail(
        Envs.SENDER_EMAIL, Envs.RECEIVER_EMAIL, message.as_string()
    )
  
    return {"msg":"send mail"}