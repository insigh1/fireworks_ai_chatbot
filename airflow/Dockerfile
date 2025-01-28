# File: airflow/Dockerfile
FROM apache/airflow:2.5.1

# Copy requirements
COPY requirements.txt /requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r /requirements.txt

# Copy DAGs
COPY dags /opt/airflow/dags

