import json, uuid

INCOMPLETE = 'INCOMPLETE'
COMPLETE = 'COMPLETE'
INPROGRESS = 'INPROGRESS'

def getData():
    # load data from data.json
    try:
        with open('./shared/data.json', 'r') as f:
            json_file = json.load(f)
    except FileNotFoundError:
        json_file = {}
    
    return json_file

def saveData(data):
    # save data into data.json
    with open('./shared/data.json', 'w') as f:
        json.dump(data, f)

def update_users(users):
    # given an array of users, update the database with those users
    data = getData()
    
    # add usernames to our database
    data['users'] = []
    for user in users:
        data['users'].append(str(user).strip())
    
    saveData(data)

def create_task(title, deadline, usernames):
    task = {
        'id': str(uuid.uuid4()),
        'title': title,
        'deadline': deadline,
        'usernames': usernames,
        'status': 'NOT_STARTED'
    }

    data = getData()

    if 'tasks' in data:
        data['tasks'].append(task)
    else:
        data['tasks'] = [task]
    
    saveData(data)

    return {'id': task['id']}

def get_user_tasks(username):
    data = getData()
    tasks = []
    if 'tasks' in data:
        for t in data['tasks']:
            if 'usernames' in t and username in t['usernames']:
                tasks.append(t)

    
    return {
        'tasks': tasks
    }

def get_users():
    data = getData()
    if 'users' in data:
        return {'users': data['users']}
    
    return {'users': []}

def get_upcoming_tasks():
    return {'tasks': []}

def get_progress():
    data = getData()
    if not 'tasks' in data:
        return {}

    completed = 0
    in_progress = 0
    not_started = 0
    total = 0
    for t in data['tasks']:
        if 'status' in t:
            if t['status'] == COMPLETE:
                completed += 1
            elif t['status'] == INPROGRESS:
                in_progress += 1
            else:
                not_started += 1
        else:
            not_started += 1
        
        total += 1


    return {
        'completed': completed,
        'in_progress': in_progress,
        'not_started': not_started,
        'total': total
    }

def get_current_tasks():
    tasks = []
    data = getData()

    if 'tasks' in data:
        for t in data['tasks']:
            if t['status'] == INPROGRESS:
                tasks.append(t)
    
    return {
        'tasks': tasks
    }
