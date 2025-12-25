Setup
```
# clone the repository
git clone https://github.com/CHIDIMON/Thirasak.DevTest-Internship-BluebikVulcan.git

# enter project directory
cd Thirasak.DevTest-Internship-BluebikVulcan
```
Option 1: Docker (Recommended)
```
# build and start the application
docker compose up --build

# Access the app at http://localhost:3000
# To stop: Press Ctrl + C
```
Option 2: macOS / Linux
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
Option 3: Windows (PowerShell)
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
```
# Transaction History Dashboard
เว็บแอปพลิเคชันแบบ Full-stack สำหรับบริหารจัดการและแสดงผลข้อมูลธุรกรรมการเงิน (Transaction History) พัฒนาโดยใช้ Next.js สำหรับFrontend และ FastAPI สำหรับBackend พร้อมรองรับการใช้งานผ่าน Docker เพื่อความสะดวกในการติดตั้งและใช้งาน
โปรเจกต์นี้เป็นส่วนหนึ่งของการทดสอบ Bluebik Vulcan Internship Assessment
## Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Features:** Server-side Rendering (SSR), Responsive Design, Type Safety

## Backend
- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLite (Lightweight & Portable)
- **Documentation:** Swagger UI / ReDoc (Auto-generated)

## DevOps & Tools
- **Containerization:** Docker & Docker Compose
- **Version Control:** Git

## Key Features
- Data Table:ตารางแสดงข้อมูลธุรกรรมที่สวยงาม สะอาดตา พร้อมระบบแบ่งหน้า (Pagination)
- Smart Search:ค้นหาธุรกรรมจากชื่อลูกค้าได้ทันที (Instant Search)
- Status Filtering:กรองสถานะธุรกรรมได้ง่ายๆ (`Completed`, `Pending`, หรือ `Failed`)
- ycl Sorting:เรียงลำดับข้อมูลได้ตาม วันที่, ยอดเงิน หรือ ชื่อลูกค้า (มากไปน้อย / น้อยไปมาก)
- Responsive UI:รองรับการใช้งานสมบูรณ์แบบทั้งบนคอมพิวเตอร์และมือถือ
- Dockerized:ติดตั้งและรันโปรเจกต์ได้ง่ายๆ ด้วยคำสั่งเดียว ผ่าน Docker
