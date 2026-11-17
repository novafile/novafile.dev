nvf convert order.json --to nova -o order.nova
nvf get api-response.json 'items[?price<10].name' -r
