FROM python:3.10


WORKDIR /app
COPY ./requirements.txt /app



ENV PYTHONPATH=${PYTHONPATH}:${PWD} 

RUN pip install -r requirements.txt
RUN pip install --no-cache-dir tensorflow==2.12.0

COPY . .

EXPOSE 5000

ENV LISTEN_PORT=5000

ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000
ENV FLASK_APP="recognition_service/app.py"
ENV MODEL_PATH="recognition_service/model/dog_face_model_val_loss_weights_00863.hdf5"

CMD [ "flask", "run" ]