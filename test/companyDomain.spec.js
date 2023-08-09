const test = require('ava');

test.serial('should resolve companyDomain if companyName and companyTld provides default values', async t => {
  const actual = await resolveCompanyDomain();
  t.is(actual, 'foo.bar');
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
    'stencil(account):companyName': Promise.resolve('foo'),
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
