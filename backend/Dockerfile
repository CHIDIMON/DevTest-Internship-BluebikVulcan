# Use Python 3.10 slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run FastAPI server on host 0.0.0.0
CMD ["fastapi", "run", "app/main.py", "--host", "0.0.0.0", "--port", "8000"]