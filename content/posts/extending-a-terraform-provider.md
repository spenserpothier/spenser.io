---
title: "Extending a Terraform Provider"
date: 2022-03-30T18:00:00-07:00
draft: true
summary: |
    At my day job I was given the opportunity to contribute to a Terraform provider for datadog to add the ability to create a monitor using a JSON document.
---

## Problem

At my day job we use terraform pretty extensively for all of our infrastructure. We also use terraform along with some other automations to automatically create dashboards and monitors for new teams and services. 

## Starting point

Hashicorp provides an excellent [tutorial](https://learn.hashicorp.com/collections/terraform/providers) on their learning site on how to write a provider for terraform. Datadog also has some useful [instructions](https://github.com/DataDog/terraform-provider-datadog/blob/master/DEVELOPMENT.md) on the development process they use for this provider.

https://github.com/DataDog/terraform-provider-datadog/pull/1226

### Forcing in dev provider

To not use the provider from the registry and instead use a local one under development, create a config file for the terraform cli:

```hcl
provider_installation {  
  dev_overrides {
  	# provider to be overridden, path to new provider.
	# path must include provider binary with name as it is expected appear
	# e.g. terraform-provider-datadog
    "<repository>/<provider-name>" = "/Users/<username>/go/bin/"
	"Datadog/datadog" = "/Users/spothier/go/github.com/Datadog/datadog-terraformprovider"
 }  
  direct {}  
}

```

Force the cli to use this config with `TF_CLI_CONFIG_FILE=/path/to/dev.tfrc`

https://www.terraform.io/docs/cli/config/config-file.html#development-overrides-for-provider-developers

### Debugging

Add the following to `main.go` and run with `--debug` flag:

```go

func main() {
    var debugMode bool

    flag.BoolVar(&debugMode, "debug", false, "set to true to run the provider with support for debuggers like delve")
    flag.Parse()

    opts := &plugin.ServeOpts{ProviderFunc: provider.New}

    if debugMode {
        // TODO: update this string with the full name of your provider as used in your configs
        err := plugin.Debug(context.Background(), "registry.terraform.io/my-org/my-provider", opts)
        if err != nil {
            log.Fatal(err.Error())
        }
        return
    }

    plugin.Serve(opts)
}

```


This will output something like:

```
TF_REATTACH_PROVIDERS='{"registry.terraform.io/my-org/my-provider":{"Protocol":"grpc","ProtocolVersion":5,"Pid":26460,"Test":true,"Addr":{"Network":"unix","String":"/var/folders/y8/bxwjmbw535n429n5nb7b86y80000gp/T/plugin216655400"}}}'
```

Add/export this when running `terraform plan`/`apply` and it will use the running provider

https://www.terraform.io/docs/extend/debugging.html#enabling-debugging-in-a-provider