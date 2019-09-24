docker build . -t poc:latest

docker run -it --rm -v %cd%\src:/usr/src poc:latest

