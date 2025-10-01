from flask import Flask, request, redirect
import json, uuid
from helper import *

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the home page ("/")
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/init_project', methods=['POST'])
def init_project_route():
    if request.method != 'POST':
        return redirect('/')

    if not request.json:
        return redirect('/')

    if not ('users' in request.json):
        return redirect('/')
    
    update_users(request.json['users'])

    return ""

# POST /create_task
@app.route('/create_task', methods=['POST'])
def create_task_route():
    if request.method == 'POST':
        if not request.json:
            return redirect('/')
        if not ('deadline' in request.json or 'title' in request.json or 'usernames' in request.json):
            return redirect('/')
        
        return create_task(request.json['title'], request.json['deadline'], request.json['usernames'])
    
    return redirect('/')

@app.route('/get_users')
def get_users_route():
    return get_users()

@app.route('/user/<username>/task_list')
def get_user_tasklist_route(username):
    print(username)
    return get_user_tasks(username)

@app.route('/get_upcoming_tasks')
def get_upcoming_tasks_route():
    #TODO: convert dates into unix time...
    return get_upcoming_tasks()

@app.route('/get_progress')
def get_progress_route():
    return get_progress()

@app.route('/get_current_tasks')
def get_current_tasks_route():
    return get_current_tasks()

# PUT /user/task [or post]
example = {
    'task_id': 0,
    'status': ['INCOMPLETE','COMPLETE','IN-PROGRESS']
}

# Run the application if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
