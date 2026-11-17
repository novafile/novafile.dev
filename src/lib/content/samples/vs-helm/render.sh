nvf render deployment.tpl.nova --schema k8s.novs \
  --set 'containers=[{name: api, image: "ghcr.io/example/api:v5"}]' \
  --set metrics=true --to yaml | kubectl apply -f -
