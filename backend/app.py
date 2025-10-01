from flask import Flask, request, redirect
import json, uuid

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the home page ("/")
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/init_project', methods=['POST'])
def init_project():
    if request.method != 'POST':
        return redirect('/')

    if not request.json:
        return redirect('/')

    if not ('users' in request.json):
        return redirect('/')
    
    try:
        with open('./shared/data.json', 'r') as f:
            json_file = json.load(f)
    except FileNotFoundError:
        json_file = {}
    
    # add usernames to our database
    json_file['users'] = []
    for user in request.json['users']:
        print(user.strip())
        json_file['users'].append(str(user).strip())
    # json_file['users'] = request.json['users']
    
    with open('./shared/data.json', 'w') as f:
        json.dump(json_file, f)

    return ""

# POST /create_task
@app.route('/create_task', methods=['POST'])
def create_task():
    if request.method == 'POST':
        if not request.json:
            return redirect('/')
        if not ('deadline' in request.json or 'title' in request.json or 'usernames' in request.json):
            return redirect('/')
        
        task = {
            'id': str(uuid.uuid4()),
            'title': request.json['title'],
            'deadline': request.json['deadline'],
            'usernames': request.json['usernames'],
            'status': 'NOT_STARTED'
        }
        
        try:
            with open('./shared/data.json', 'r') as f:
                json_file = json.load(f)
        except FileNotFoundError:
            json_file = {}

        if 'tasks' in json_file:
            json_file['tasks'].append(task)
        else:
            json_file['tasks'] = [task]
        
        with open('./shared/data.json', 'w') as f:
            json.dump(json_file, f)

        return {'id': task['id']}
    
    return redirect('/')

@app.route('/get_users')
def get_users():
    with open('./shared/data.json', 'r') as f:
        json_file = json.load(f)
        if 'users' in json_file:
            return {'users': json_file['users']}
    
    return {'users': []}

# @app.route()
# def get_user_task_list():

# GET /user/{user_id}/tasks_list
# Response will contain
example = {
    'tasks': [
        {
            'id': 0,
            'title': 'important work',
            'deadline': '12/12/25',
        },
    ]
}

# GET /upcoming_tasks
example = {
    'tasks': [
        {
            'id': 0,
            'title': 'important work',
            'deadline': '12/12/25',
        },
    ]
}

# GET /progress
example = {
    'completed': 2,
    'in_progress': 4,
    'total': 100
}

# GET /current_task


# PUT /user/task [or post]
example = {
    'task_id': 0,
    'status': ['INCOMPLETE','COMPLETE','IN-PROGRESS']
}

# Run the application if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
