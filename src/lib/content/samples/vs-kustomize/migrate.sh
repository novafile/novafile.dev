nvf render base.tpl.nova --set env=prod > base.nova
nvf patch base.nova prod.nova-patch --schema infra.novs
