const test = require('ava');

test.serial('should resolve compound companyDomain if ssm:companyDomain is not resolvable and stencil:companyName and stencil:companyTld provides default values', async t => {
  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
  };

  const actual = await resolveCompanyDomain(mockOverwrites);
  t.is(actual, 'acme.bar');
});

test.serial('should resolve compound companyDomain if ssm:companyDomain is not resolvable and stencil:companyName and stencil:companyTld are overwritten', async t => {
  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
    'stencil(account):companyName': Promise.resolve('inc'),
    'stencil(account):companyTld': Promise.resolve('com'),
  };

  const actual = await resolveCompanyDomain(mockOverwrites);
  t.is(actual, 'inc.com');
});

test.serial('should reject if ssm:companyDomain and stencil:companyTld is not resolvable', async t => {
  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
    'stencil(account):companyTld': undefined,
  };

  const actual = await t.throwsAsync(
    resolveCompanyDomain(mockOverwrites),
  );
  t.true(actual instanceof Error);
  t.is(actual.message, 'Unknown variable expression \'stencil(account):companyTld\'.');
});

test.serial('should reject if ssm:companyDomain and stencil:companyName is not resolvable', async t => {
  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
    'stencil(account):companyName': undefined,
  };

  const actual = await t.throwsAsync(
    resolveCompanyDomain(mockOverwrites),
  );
  t.true(actual instanceof Error);
  t.is(actual.message, 'Unknown variable expression \'stencil(account):companyName\'.');
});

test.serial('should reject if ssm:companyDomain and stencil:companyName and stencil:companyTld is not resolvable', async t => {
  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
    'stencil(account):companyName': undefined,
    'stencil(account):companyTld': undefined,
  };

  const actual = await t.throwsAsync(
    resolveCompanyDomain(mockOverwrites),
  );
  t.true(actual instanceof Error);
  t.is(actual.message, 'Unknown variable expression \'stencil(account):companyName\'.');
});

test.serial('should return cached result if resolution happens more than once', async t => {
  const underTest = createUncachedInstance();
  const actual = await underTest.resolve({
    variableUtils: createVariableUtilsMock(),
  });
  t.is(actual, 'ssm.foo');

  const mockOverwrites = {
    'ssm(us-east-1):/stencil/aws/companyDomain': undefined,
    'stencil(account):companyName': undefined,
  };

  const actualCached = await underTest.resolve({
    variableUtils: createVariableUtilsMock(mockOverwrites),
  });
  t.is(actualCached, 'ssm.foo');
});

const resolveCompanyDomain = (overwrites = {}) => {
  const underTest = createUncachedInstance();
  return underTest.resolve({
    variableUtils: createVariableUtilsMock(overwrites),
  });
};

const createUncachedInstance = () => {
  delete require.cache[require.resolve('../blocks/companyDomain')];
  return require('../blocks/companyDomain.js');
};

const createVariableUtilsMock = overwrites => {
  const resolveVariableValues = {
    'ssm(us-east-1):/stencil/aws/companyDomain': Promise.resolve('ssm.foo'),
    'stencil(account):companyName': Promise.resolve('acme'),
    'stencil(account):companyTld': Promise.resolve('bar'),
  };
  Object.assign(resolveVariableValues, overwrites);

  return {
    resolveVariable(varialbleExpression) {
      const potentiallyResolved = resolveVariableValues[varialbleExpression];
      if (potentiallyResolved === undefined) {
        return Promise.reject(new Error(`Unknown variable expression '${varialbleExpression}'.`));
      }

      return potentiallyResolved;
    },
  };
};
