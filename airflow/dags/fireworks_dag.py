from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

def sample_task(**kwargs):
    print("Running a sample Airflow task for Fireworks demo!")

with DAG(
    "fireworks_demo_dag",
    start_date=datetime(2025, 1, 1),
    schedule_interval="@daily",
    catchup=False,
) as dag:
    task = PythonOperator(
        task_id="sample_task",
        python_callable=sample_task,
    )

