nvf schema proto infrastructure.novs > infrastructure.proto
nvf convert service.nova --to protobuf --schema infrastructure.novs -o service.pb
nvf convert service.pb --schema infrastructure.novs --to nova
