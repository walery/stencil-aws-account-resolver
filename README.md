# stencil-aws-account-resolver

Stencil blocks to resolve account name and related values of AWS account.

## List of existent blocks

Following table shows list of existent blocks and what they are resolved to.

Block | Resolution
---|---
`${stencil(account):alias}` | acme-playground
`${stencil(account):companyTld}` | cloud
`${stencil(account):id}` | 123456789012
`${stencil(account):name}` | acme-playground
`${stencil(account):unit}` | playground
`${stencil(account):companyName}` | acme
`${stencil(account):companyDomain}` | acme.cloud
`${stencil(account):domain}` | playground.acme.cloud
`${stencil(account):domainHostedZoneId}` | Z3XXYYAABBCCDD
