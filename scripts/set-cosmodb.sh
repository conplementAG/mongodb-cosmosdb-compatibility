#!/bin/bash

rg_name=db-poc-we
cosmodb_account=poc-account-123
location=westeurope
db_name=test

az group create -l $location -n $rg_name

az cosmosdb create -n $cosmodb_account -g $rg_name --kind MongoDB --capabilities "EnableAggregationPipeline"

az cosmosdb mongodb database create --account-name $cosmodb_account --name $db_name --resource-group $rg_name

az cosmosdb list-connection-strings --name $cosmodb_account -g $rg_name