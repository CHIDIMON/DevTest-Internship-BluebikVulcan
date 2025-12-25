Setup
```
# clone the repository
git clone [https://github.com/CHIDIMON/Thirasak.DevTest-Internship-BluebikVulcan.git](https://github.com/CHIDIMON/Thirasak.DevTest-Internship-BluebikVulcan.git)

# enter project directory
cd Thirasak.DevTest-Internship-BluebikVulcan
```
Option 1: macOS / Linux
```
Backend Setup (Terminal 1)

# enter backend directory
cd backend

# create & activate virtual environment
python3 -m venv venv
source venv/bin/activate

# install dependencies
pip install -r requirements.txt

# serve backend at localhost:8000
fastapi dev app/main.py


Frontend Setup (Terminal 2)

# enter frontend directory
cd ../frontend

# install dependencies
npm install

# create env file pointing to local backend
echo "NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)" > .env.local

# serve frontend with hot reload at localhost:3000
npm run dev
```
Option 2: Windows (PowerShell)
```
Backend Setup (Terminal 1)

# enter backend directory
cd backend

# create & activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# serve backend at localhost:8000
python -m fastapi dev app/main.py


Frontend Setup (Terminal 2)

# enter frontend directory
cd ..\frontend

# install dependencies
npm install