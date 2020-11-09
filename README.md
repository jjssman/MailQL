# MailQL

**A lightweight GraphQL API with live-query support to easily retrieve and manage your emails.**

---
MailQL takes care of processing and storing all emails arriving to your server, and exposes a GraphQL api with websocket live-querying support so you can easily integrate email data into your own software.

Some example cases in which MailQL would speed up your development:
 - You are creating your own webmail interface and need a simple and reliable way to pull the email data.
 - You are working on an a browser extension or PWA app which sends you a push notification with the sender email and subject whenever when an email is received.
 - You are developing a webhook which should automatically trigger whenever an email with certain characteristics arrives.