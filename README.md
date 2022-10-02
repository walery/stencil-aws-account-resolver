# stencil-aws-account-resolver

Stencil blocks to resolve account name and related values of AWS account.

## List of existent blocks

Following table shows list of existent blocks and what they are resolved to.

Block | Resolution | Original source
---|---|---
`${stencil(account):alias}` | acme-playground | API(`IAM listAccountAliases`)`.AccountAliases[0]`
`${stencil(account):companyTld}` | cloud | `ssm(us-east-1):/stencil/aws/companyTld`
`${stencil(account):id}` | 123456789012 | API(`STS getCallerIdentity`)`.Account`
`${stencil(account):name}` | acme-playground | API(`Organizations describeAccount`)`.Account.Name`
`${stencil(account):unit}` | playground | `${stencil(account):name}.split('-').slice(1).join('-')`
`${stencil(account):companyName}` | acme | `${stencil(account):name}.split('-')[0]`
`${stencil(account):companyDomain}` | acme.cloud | `${stencil(account):companyName}`.`${stencil(account):companyTld}`
`${stencil(account):domain}` | playground.acme.cloud | `${stencil(account):unit}`.`${stencil(account):companyDomain}`
`${stencil(account):domainHostedZoneId}` | Z3XXYYAABBCCDD | API(`Route53 listHostedZonesByName`)`.Id`
