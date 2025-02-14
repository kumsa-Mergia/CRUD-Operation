from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = []  # Your global task list

@app.route('/')
def index():
    return render_template('index.html', task_list=tasks)  # Renamed here

@app.route('/create', methods=['GET', 'POST'])  # Handle both GET and POST
def create():
    if request.method == 'POST':
        task_content = request.form['content']
        if task_content:  # Check for empty content
            tasks.append({'content': task_content, 'completed': False})
        return redirect(url_for('index'))
    return render_template('create.html')  # For GET requests

@app.route('/update/<int:task_id>', methods=['GET', 'POST'])
def update(task_id):
    if 0 <= task_id < len(tasks):
        task = tasks[task_id]
        if request.method == 'POST':
            new_content = request.form['content']
            if new_content:
                task['content'] = new_content
            return redirect(url_for('index'))
        return render_template('update.html', task=task, task_id=task_id)
    return "Task not found", 404  # Proper 404 handling

@app.route('/delete/<int:task_id>')
def delete(task_id):
     if 0 <= task_id < len(tasks):
        del tasks[task_id]
     return redirect(url_for('index'))

@app.route('/toggle/<int:task_id>')
def toggle(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['completed'] = not tasks[task_id]['completed']
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)