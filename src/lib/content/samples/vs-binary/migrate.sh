nvf convert events.cbor --to nova
nvf convert events.nova --to binary-canonical -o events.nvb
nvf convert events.nova --to cbor-deterministic -o events.cbor
nvf hash events.nova
