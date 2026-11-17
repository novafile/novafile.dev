nvf convert service.yaml --to nova -o service.nova
nvf schema from-json-schema service.schema.json > service.novs
nvf validate service.nova --schema service.novs
