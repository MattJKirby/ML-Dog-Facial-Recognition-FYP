FROM python:3.10

ADD . /code
WORKDIR /code

ENV PYTHONPATH=${PYTHONPATH}:${PWD} 

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

EXPOSE 5000

ENV LISTEN_PORT=5000
ENV FLASK_APP="recognition_service/__init__.py"

CMD [ "poetry", "run", "flask", "run", "--host=0.0.0.0"]