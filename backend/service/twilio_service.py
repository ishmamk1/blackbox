from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_TOKEN")

client = Client(account_sid, auth_token)

def send_mobile_notification(number, message):
	message = client.messages.create(
		from_='+18669727757',
		body=message,
		to=number
	)

	print(message.sid)


# send_mobile_notification("+19293993322", "Someone is trying to steal ur car!")
