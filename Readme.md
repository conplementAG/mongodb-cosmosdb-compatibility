Why MongoDB 3.6?
Beacuse its one of the version that still LTS will be defined. MongoDB 3.4 has LTS till 1 Jan 2020. MongoDB 3.2 LTS expired on 2019. 


How to setup CosmoDB?

==========================

docker build . -t poc:latest

docker run -it --rm -v %cd%\src:/usr/src poc:latest

==========================

npm run twatch

=========================

When using the azure cosmos emulator for local development the url to access the locahost is host.docker.internal.
Currently docker-for-desktop dosent have any affect on network_mode = host. It works only on Linux.