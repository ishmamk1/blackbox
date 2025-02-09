from api import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host="10.253.211.32", debug=True, port=5000)