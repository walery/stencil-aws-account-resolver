let accountDomainHostedZoneId = null;

module.exports.resolve = ({variableUtils, slsHelper}) => {
  if (accountDomainHostedZoneId !== null) {
    return accountDomainHostedZoneId;
  }

  accountDomainHostedZoneId = new Promise(async (resolve, reject) => {
    try {
      const accountDomain = await variableUtils.resolveVariable('stencil(account):domain');

      // TODO read all pages if response is paginated
      const {HostedZones} = await slsHelper.sendAwsRequest('Route53', 'listHostedZonesByName', {DNSName: `${accountDomain}.`});

      const zoneIds = HostedZones
        .filter(e => e.Name === `${accountDomain}.` && e.Config.PrivateZone === false)
        .map(e => e.Id)
        .map(e => e.split('/')[2]);

      if (zoneIds.length === 1) {
        resolve(zoneIds[0]);
      } else {
        reject(`Expected exact one match of public route53 hosted zone for '${accountDomain}' domain. Found '${zoneIds.length}' (${zoneIds})."`)
      }
    } catch (error) {
      reject(error);
    }
  });
  return accountDomainHostedZoneId;
};
