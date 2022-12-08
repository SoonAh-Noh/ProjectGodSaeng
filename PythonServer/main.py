
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'godsaeng'
socketio = SocketIO(app, cors_allowed_origins='*')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('test')
def tt():
    socketio.emit("response", {'data': 'Connected'})


@socketio.on('request')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('response', json, callback=messageReceived)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
