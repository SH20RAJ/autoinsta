from instagrapi import Client

password = ";ya_#GkM,KND6?$";
email = "uvfczvl@smartnator.com";
username = "droidcv1";

cl = Client()
cl.login(username, password)

user_id = cl.user_id_from_username(username)
medias = cl.user_medias(user_id, 20)