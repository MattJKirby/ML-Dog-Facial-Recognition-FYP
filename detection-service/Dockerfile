FROM python:3.10


WORKDIR /app
COPY ./requirements.txt /app

RUN apt-get update && apt-get install -y python3-opencv
RUN pip install opencv-python

ENV PYTHONPATH=${PYTHONPATH}:${PWD} 
RUN pip install torch
RUN pip install torchvision
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENV LISTEN_PORT=5000
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000
ENV FLASK_APP="detection_service/app.py"
ENV MODEL_PATH="detection_service/model/Tsinghua_train3_best.pt"


CMD [ "flask", "run" ]