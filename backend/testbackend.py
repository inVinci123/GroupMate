import requests

print(requests.get('http://127.0.0.1:5000/', '/').content)
print(requests.post('http://127.0.0.1:5000/init_project', json = {
    'users': ['mrinv', 'afy_2', 'tsaurus', 'cokescam', 'samy']
}))

print(requests.get('http://127.0.0.1:5000/get_users').json())


print(requests.post('http://127.0.0.1:5000/create_task',
    json = {
        'deadline': '12/23/45',
        'title': 'important kaam',
        'usernames': ['cokescam', 'tsaurus'],
}).json())
print(requests.post('http://127.0.0.1:5000/create_task',
    json = {
        'deadline': '12/23/45',
        'title': 'semi important kaam',
        'usernames': ['cokescam', 'afy_2'],
}).json())
print(requests.post('http://127.0.0.1:5000/create_task',
    json = {
        'deadline': '12/23/45',
        'title': 'very important kaam',
        'usernames': ['samy', 'tsaurus'],
}).json())
print(requests.post('http://127.0.0.1:5000/create_task',
    json = {
        'deadline': '12/23/45',
        'title': 'urgent kaam',
        'usernames': ['mrinv', 'afy_2'],
}).json())

print(requests.get('http://127.0.0.1:5000/get_all_tasks').json())

print(requests.get('http://127.0.0.1:5000/user/cokescam/task_list').json())