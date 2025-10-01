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

print(requests.get('http://127.0.0.1:5000/user/cokescam/task_list').json())